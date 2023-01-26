const mysql = require("mysql2");
const express = require("express");
const body_parser = require("body-parser");
const multer = require("multer");
const upload = multer();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("./config");

const app = express();

app.use(express.json());
app.use("/", express.static(__dirname));

const connection = mysql.createConnection({
  host: "localhost", 
  user: "root",
  database: "talon",
  password: "787898ggh"
});

function Generate_access_token(id, roles){
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload, secret, {expiresIn: "24h"});
}

/* Маршруты */

app.get("/", (req, res) =>{
  res.sendFile(__dirname + "/index.html");
});

/* Группы */

app.get("/groups", (req, response) =>{
  const true_role = ["ADMIN"];

  const sql_find_groups = "SELECT * FROM study_groups";
  /* const token = req.headers.authorization.split(" ")[1];
  
  if(token == "null"){
    return response.status(400).json({ message: "Пользователь не авторизован" });
  }

  const { roles } = jwt.verify(token, secret);
  console.log("Это мои роли:", typeof roles, roles);
  let has_role = false;

  if(true_role.includes(roles)){
    has_role = true;
  }

  if(!has_role){
    return response.status(400).json({ message: "У вас нет доступа" });
  } */

  connection.query(sql_find_groups, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("groups.hbs", { 
        groups: data
      });
    }
  });
});

app.get("/form_add_group", (req, response) =>{
  response.sendFile(__dirname + "/add_group.html");
})

app.post("/form_add_group", upload.none(), (req, response) =>{
  const sql_add_group = "INSERT INTO study_groups (name_group, description_group) VALUES(?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  let data_value = Object.values(obj_data);

  console.log("Я отработал_2", data_value);

  connection.query(sql_add_group, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }
    response.status(200).json({ message: "Группа добавлена" });
  });
})

app.get("/form_edit_group/:id", (req, response) =>{
  const true_role = ["ADMIN"];
  const id_student = req.params.id;
  const sql_find_group = "SELECT * FROM study_groups WHERE id_group=?";
  /* const token = req.headers.authorization.split(" ")[1];
  
  if(token == "null"){
    return response.status(400).json({ message: "Пользователь не авторизован" });
  }

  const { roles } = jwt.verify(token, secret);
  let has_role = false;

  if(true_role.includes(roles)){
    has_role = true;
  }

  if(!has_role){
    return response.status(400).json({ message: "У вас нет доступа" });
  }  */

  connection.query(sql_find_group, [id_student], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("edit_group.hbs", { 
        group: data[0]
      });
    }
  });
})

app.post("/form_edit_group", upload.none(), (req, response) =>{

  const obj_data = req.body;
  const sql_update_group = "UPDATE study_groups SET name_group=?, description_group=? WHERE id_group=?";

  let data_value = [
    obj_data.name_group, 
    obj_data.description_group, 
    obj_data.id_group, 
  ];

  if(!req.body){
    return response.status(400).send();
  }

  connection.query(sql_update_group, data_value, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      return response.status(200).json({ message: "Изменено" });
    }
  });
})

app.get("/delete_group/:id", (req, response)=> {
  const id_group = req.params.id;
  const sql_delete_student = "DELETE FROM study_groups WHERE id_group=?";

  connection.query(sql_delete_student, [id_group], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.redirect("/groups");
    }
  });
})

/* Студенты */

app.get("/students/:id", (req, response) =>{
  const true_role = ["ADMIN"];
  const id_group = req.params.id;
  const sql_find_students = "SELECT * FROM students WHERE id_group=?";
  /* const token = req.headers.authorization.split(" ")[1];
  
  if(token == "null"){
    return response.status(400).json({ message: "Пользователь не авторизован" });
  }

  const { roles } = jwt.verify(token, secret);
  let has_role = false;

  if(true_role.includes(roles)){
    has_role = true;
  }

  if(!has_role){
    return response.status(400).json({ message: "У вас нет доступа" });
  }  */

  connection.query(sql_find_students, [id_group], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("students.hbs", { 
        students: data,
        group: id_group
      });
    }
  });
});

app.get("/form_add_student", (req, response) =>{
  response.sendFile(__dirname + "/add_student.html");
})

app.post("/form_add_student", upload.none(), (req, response) =>{
  const sql_add_student = "INSERT INTO students (id_student, firstName, middleName, lastName, id_group) VALUES(?, ?, ?, ?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  let data_value = [
    obj_data.id_student,
    obj_data.firstName,
    obj_data.middleName,
    obj_data.lastName,
    obj_data.id_group
  ];

  console.log("Я отработал_2", data_value);

  connection.query(sql_add_student, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }
    return response.status(200).json({ message: "Студент добавлен" });
  });
})

app.get("/form_edit_student/:id", (req, response) =>{
  const true_role = ["ADMIN"];
  const id_student = req.params.id;
  const sql_find_student = "SELECT * FROM students WHERE id_student=?";
  /* const token = req.headers.authorization.split(" ")[1];
  
  if(token == "null"){
    return response.status(400).json({ message: "Пользователь не авторизован" });
  }

  const { roles } = jwt.verify(token, secret);
  let has_role = false;

  if(true_role.includes(roles)){
    has_role = true;
  }

  if(!has_role){
    return response.status(400).json({ message: "У вас нет доступа" });
  }  */

  connection.query(sql_find_student, [id_student], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("edit_student.hbs", { 
        student: data[0]
      });
    }
  });
})

app.post("/form_edit_student", upload.none(), (req, response) =>{

  const obj_data = req.body;
  const sql_update_student = "UPDATE students SET firstName=?, middleName=?, lastName=? WHERE id_student=?";

  console.log(obj_data);

  if(!req.body){
    return response.status(400).send();
  }
  connection.query(
    sql_update_student, 
    [
      obj_data.firstName, 
      obj_data.middleName, 
      obj_data.lastName, 
      obj_data.id_student
    ], 
    (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      return response.status(200).json({ message: "Изменено" });
    }
  });
})

app.get("/delete_student/:id", (req, response)=> {
  const id_student = req.params.id;
  const sql_delete_student = "DELETE FROM students WHERE id_student=?";

  connection.query(sql_delete_student, [id_student], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.redirect("/groups");
    }
  });
})

/* Льготы */

app.get("/benefits/:id", (req, response) =>{

  const id_category = req.params.id;

  const sql_find_benefits = "SELECT category_benefits.id_benefits, benefits.name_ben, benefits.first_time, benefits.last_time, benefits.cost, DATE_FORMAT(benefits.data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(benefits.data_end, '%Y-%m-%d %H:%i:%S') data_end FROM category_benefits, benefits WHERE category_benefits.id_benefits = benefits.id_benefits AND category_benefits.id_category =?";

/*   "SELECT DATE_FORMAT(benefits.data_end, '%Y-%m-%d %H:%i:%S') FROM benefits" */

  connection.query(sql_find_benefits, id_category, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("benefits.hbs", { 
        benefits: data,
        category: id_category
      });
    }
  });
})

app.get("/form_add_benefits/:id", (req, response) =>{
  const id_category = req.params.id;
  response.render("add_benefits.hbs", { 
    category: id_category
  });
})

app.post("/form_add_benefits", upload.none(), (req, response) =>{
  const sql_add_benefits = "INSERT INTO benefits (name_ben, first_time, last_time, data_begin, data_end, cost) VALUES(?, ?, ?, ?, ?, ?)";

  const sql_find_id_benefits = "SELECT * FROM benefits WHERE name_ben=?";

  const sql_add_category_benefits = "INSERT INTO category_benefits (id_category, id_benefits) VALUES(?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  let id_benefits; 
  let id_category = obj_data.id_category;

  const data_value = [
    obj_data.name_ben,
    obj_data.first_time,
    obj_data.last_time,
    obj_data.data_begin,
    obj_data.data_end,
    obj_data.cost
  ];

  console.log("Я отработал_2", data_value);

  connection.query(sql_add_benefits, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log("Льгота добавлена в льготы");
    }
  });

  connection.query(sql_find_id_benefits, obj_data.name_ben, (err, data) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }
    console.log("Нашел льготу", data[0].id_benefits);
    console.log(data[0]);
    id_benefits = data[0].id_benefits;
    connection.query(sql_add_category_benefits, [id_category, id_benefits], (err, res) =>{
      if(err){
        console.log(err);
        return response.status(400).json({ message: "Ошибка с БД" });
      }
      response.status(200).json({ message: "Льгота добавлена" });
    });  
  });
})

app.get("/form_edit_benefits/:id", (req, response) =>{
  const true_role = ["ADMIN"];
  const id_benefits = req.params.id;
  const sql_find_benefits = "SELECT DATE_FORMAT(data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(data_end, '%Y-%m-%d %H:%i:%S') data_end, id_benefits, name_ben, first_time, last_time, cost FROM benefits WHERE id_benefits=?";

  /* const token = req.headers.authorization.split(" ")[1];
  
  if(token == "null"){
    return response.status(400).json({ message: "Пользователь не авторизован" });
  }

  const { roles } = jwt.verify(token, secret);
  let has_role = false;

  if(true_role.includes(roles)){
    has_role = true;
  }

  if(!has_role){
    return response.status(400).json({ message: "У вас нет доступа" });
  }  */

  connection.query(sql_find_benefits, [id_benefits], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("edit_benefits.hbs", { 
        benefits: data[0]
      });
    }
  });
})

app.post("/form_edit_benefits", upload.none(), (req, response) =>{

  const obj_data = req.body;

  const sql_update_benefits = "UPDATE benefits SET name_ben=?, first_time=?, last_time=?, data_begin=?, data_end=?, cost=? WHERE id_benefits=?";

  console.log(obj_data);

  if(!req.body){
    return response.status(400).send();
  }
  connection.query(
    sql_update_benefits, 
    [
      obj_data.name_ben, 
      obj_data.first_time, 
      obj_data.last_time, 
      obj_data.data_begin,
      obj_data.data_end,
      obj_data.cost,
      obj_data.id_benefits
    ], 
    (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      return response.status(200).json({ message: "Изменено" });
    }
  });
})

app.get("/delete_benefits/:id", (req, response)=> {
  const id_benefits = req.params.id;
  const sql_delete_benefits = "DELETE FROM benefits WHERE id_benefits=?";

  connection.query(sql_delete_benefits, [id_benefits], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.redirect("/groups");
    }
  });
})

/* Категории */

app.get("/category", (req, response) =>{

  const sql_find_category = "SELECT * FROM category";

  connection.query(sql_find_category, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("category.hbs", { 
        category: data
      });
    }
  });
})

app.get("/form_add_category", (req, response) =>{
  response.sendFile(__dirname + "/add_category.html");
})

app.post("/form_add_category", upload.none(), (req, response) =>{
  const sql_add_category = "INSERT INTO category (name_cat, rank_category) VALUES(?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  const data_value = [
    obj_data.name_cat,
    obj_data.rank
  ];

  console.log("Я отработал_2", data_value);

  connection.query(sql_add_category, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log("Категория добавлена");
      return response.status(200).json({ message: "Категория добавлена" });
    }
  });
})

app.get("/form_edit_category/:id", (req, response) =>{
  const true_role = ["ADMIN"];
  const id_category = req.params.id;
  const sql_find_category = "SELECT * FROM category WHERE id_category=?";
  /* const token = req.headers.authorization.split(" ")[1];
  
  if(token == "null"){
    return response.status(400).json({ message: "Пользователь не авторизован" });
  }

  const { roles } = jwt.verify(token, secret);
  let has_role = false;

  if(true_role.includes(roles)){
    has_role = true;
  }

  if(!has_role){
    return response.status(400).json({ message: "У вас нет доступа" });
  }  */

  connection.query(sql_find_category, [id_category], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.render("edit_category.hbs", { 
        category: data[0]
      });
    }
  });
})

app.post("/form_edit_category", upload.none(), (req, response) =>{
  const sql_update_category = "UPDATE category SET name_cat=?, rank_category=? WHERE id_category=?";

  if(!req.body){
    return response.status(400).send();
  }
  
  const obj_data = req.body;  
  console.log("I am", obj_data);

  connection.query(
    sql_update_category, 
    [
      obj_data.name_cat, 
      obj_data.rank_category,
      obj_data.id_category
    ], 
    (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      return response.status(200).json({ message: "Изменено" });
    }
  });
})

/* Регистрация / Авторизация */

app.post("/registration", upload.none(), (req, response) =>{
  
  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  function Find_or_Add_user(){
    const sql_find_user = "SELECT * FROM test WHERE username=?";
    connection.query(sql_find_user, [obj_data.userName], (err, data) =>{
      if(err){ 
        console.log(err);
        response.status(400).json({ message: "Ошибка БД" });
        return;
      }else if(data.length !== 0){
        return response.status(400).json({ message: "Пользователь уже есть в БД" });
      }else{
        Add_user();
        return;
      }
    });
  }

  function Add_user(){
    const sql_add_user = "INSERT INTO test(username, password, age) VALUES(?, ?, ?)";

    obj_data.password = bcrypt.hashSync(obj_data.password, 10);
    let data_value = Object.values(obj_data);

    connection.query(sql_add_user, data_value, (err, res) =>{
      if(err){
        console.log(err);
        return response.status(400).json({ message: "Ошибка с БД" });
      }
      response.status(200).json({ message: "Пользоваетль добавлен" });
    });
  }

  Find_or_Add_user();

});

app.post("/login", upload.none(), (req, response) =>{
  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;
  
  function Find_or_Login(){
    const sql_find_user = "SELECT * FROM test WHERE username=?";
    connection.query(sql_find_user, [obj_data.userName], (err, data) =>{
      if(err){ 
        console.log(err);
        return response.status(400).json({ message: "Ошибка БД" });
      }else if(data.length !== 0){
        Login(data);
        return;
      }else{
        return response.status(400).json({ message: "Пользователь не найден" });
      }
    });
  }

  function Login(data){
    let valid_password = bcrypt.compareSync(obj_data.password, data[0].password);
    if(!valid_password){
      return response.status(400).json({ message: "Пароль не правильный" });
    }
    const token = Generate_access_token(data[0].id, data[0].age);
    return response.json({ token, message: "Ты авторизован" });
  }

  Find_or_Login();
})

app.listen(3000, () =>{ console.log("Сервер запущен...") });