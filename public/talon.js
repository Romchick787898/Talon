const mysql = require("mysql2");
const express = require("express");
const body_parser = require("body-parser");
const multer = require("multer");
const upload = multer();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("./config");
const { response } = require("express");
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use("/", express.static(__dirname));
app.use(cookieParser());

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

  const token = jwt.sign(payload, secret, {expiresIn: "24h"});

  return token;
}

function Valide_role(req){
  const true_role = ["ADMIN"];
  const token = req.cookies.token;

  try{
    const { roles } = jwt.verify(token, secret);
    let has_role = false;
    has_role = true_role.includes(roles);
  
    if(!has_role){
      return false;
    }

    return true;

  }catch(err){
    return false;
  }
}

/* Для Admin-ов */

app.get("/", (req, res) =>{
  res.sendFile(__dirname + "/index.html");
});

/* Группы */

app.get("/groups", (req, response) =>{
  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }
    
  const sql_find_groups = "SELECT * FROM study_groups";
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
  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }
  response.sendFile(__dirname + "/add_group.html");
})

app.post("/form_add_group", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_student = req.params.id;
  const sql_find_group = "SELECT * FROM study_groups WHERE id_group=?";
  
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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_group = req.params.id;
  const sql_find_students = "SELECT * FROM students WHERE id_group=?";

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  response.sendFile(__dirname + "/add_student.html");
})

app.post("/form_add_student", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_student = req.params.id;
  const sql_find_student = "SELECT * FROM students WHERE id_student=?";

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const obj_data = req.body;
  const sql_update_student = "UPDATE students SET firstName=?, middleName=?, lastName=?, id_student=? WHERE id_student=?";

  console.log(typeof obj_data.id_student);

  if(!req.body){
    return response.status(400).send();
  }

  connection.query(
    sql_update_student, 
    [
      obj_data.firstName, 
      obj_data.middleName, 
      obj_data.lastName, 
      obj_data.id_student,
      obj_data.id_student_defult
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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

app.get("/benefits", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const sql_find_benefits = "SELECT benefits.id_benefits, benefits.name_ben, benefits.first_time, benefits.last_time, benefits.cost, DATE_FORMAT(benefits.data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(benefits.data_end, '%Y-%m-%d %H:%i:%S') data_end FROM  benefits";

  connection.query(sql_find_benefits, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("benefits.hbs", { 
        benefits: data,
      });
    }
  });
})

app.get("/benefits/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_category = req.params.id;

  const sql_find_benefits = "SELECT category_benefits.id_benefits, benefits.name_ben, benefits.first_time, benefits.last_time, benefits.cost, DATE_FORMAT(benefits.data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(benefits.data_end, '%Y-%m-%d %H:%i:%S') data_end FROM category_benefits, benefits WHERE category_benefits.id_benefits = benefits.id_benefits AND category_benefits.id_category =?";

  connection.query(sql_find_benefits, id_category, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("benefits_for_category.hbs", { 
        benefits: data,
        category: id_category
      });
    }
  });
})

app.get("/form_add_benefits", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  response.sendFile(__dirname + "/add_benefit.html");

})

app.get("/form_add_benefits/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_category = req.params.id;
  const sql_find_all_benefits = "SELECT * FROM benefits";

  connection.query(sql_find_all_benefits, (err, data) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }
    return response.render("add_category_benefits.hbs", { 
      category: id_category,
      benefits: data
    });
  });

})

app.post("/form_add_benefits", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const sql_add_benefits = "INSERT INTO benefits (name_ben, first_time, last_time, data_begin, data_end, cost) VALUES(?, ?, ?, ?, ?, ?)";

  const sql_add_category_benefits = "INSERT INTO category_benefits (id_category, id_benefits) VALUES(?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  const data_value = [
    obj_data.name_ben,
    obj_data.first_time,
    obj_data.last_time,
    obj_data.data_begin,
    obj_data.data_end,
    obj_data.cost
  ];

  connection.query(sql_add_benefits, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log("Льгота добавлена в льготы");
    }
  });
})

app.post("/form_add_benefits_for_category", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const sql_add_category_benefits = "INSERT INTO category_benefits (id_category, id_benefits) VALUES(?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  const data_value = [
    obj_data.id_category,
    obj_data.name_ben,
  ];

  connection.query(sql_add_category_benefits, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log("Льгота добавлена");
      return response.status(200).json({ message: "Льгота добавлена в категорию" });
    }
  });
})

app.get("/form_edit_benefits/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_benefits = req.params.id;
  const sql_find_benefits = "SELECT DATE_FORMAT(data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(data_end, '%Y-%m-%d %H:%i:%S') data_end, id_benefits, name_ben, first_time, last_time, cost FROM benefits WHERE id_benefits=?";

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

app.get("/delete_benefits_for_category/:id", (req, response)=> {

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_benefits = req.params.id;
  const id_category = req.query.id_category;
  const sql_delete_benefits = "DELETE FROM category_benefits WHERE id_benefits=? AND id_category=?";

  connection.query(sql_delete_benefits, [id_benefits, id_category], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.redirect("/category");
    }
  });
})

app.get("/delete_benefits/:id", (req, response)=> {

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_benefits = req.params.id;
  const sql_delete_benefits = "DELETE FROM benefits WHERE id_benefits=?";

  connection.query(sql_delete_benefits, [id_benefits], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.redirect("/benefits");
    }
  });
})

/* Категории */

app.get("/category", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  response.sendFile(__dirname + "/add_category.html");
})

app.post("/form_add_category", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_category = req.params.id;
  const sql_find_category = "SELECT * FROM category WHERE id_category=?";

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

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

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

app.get("/delete_category/:id", (req, response)=> {

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_category = req.params.id;
  const sql_delete_category = "DELETE FROM category WHERE id_category=?";

  connection.query(sql_delete_category, [id_category], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД, проверьте что к категории не привязана льгота" });
    }else{
      response.redirect("/category");
    }
  });
})

/* Категории и студенты */

app.get("/student_category/:id", (req, response)=>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_student = req.params.id;
  const sql_find_student_category = "SELECT category.id_category, category.name_cat, DATE_FORMAT(students_category.data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(students_category.data_end, '%Y-%m-%d %H:%i:%S') data_end FROM category, students_category WHERE students_category.id_category = category.id_category AND students_category.id_student=?";

  connection.query(sql_find_student_category, [id_student], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.render("students_category.hbs", { 
        student_category: data,
        student: id_student,
      });
    }
  });
});

app.get("/form_add_student_category", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_student = req.query.id_student;
  const sql_find_category = "SELECT * FROM category";

  connection.query(sql_find_category, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.render("add_student_category.hbs", { 
        category: data,
        student: id_student,
      });
    }
  });
});

app.post("/form_add_student_category", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const sql_add_student_category = "INSERT INTO students_category (id_student, id_category, data_begin, data_end) VALUES(?, ?, ?, ?)";

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;

  const data_value = [
    obj_data.id_student,
    obj_data.id_category,
    obj_data.data_begin,
    obj_data.data_end,
  ];

  console.log("Я отработал_2", data_value);

  connection.query(sql_add_student_category, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log("Категория добавлена");
      return response.status(200).json({ message: "Категория добавлена" });
    }
  });
});

app.get("/form_edit_student_category/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_category = req.params.id;
  const id_student = req.query.id_student;
  const sql_find_category = "SELECT category.name_cat, DATE_FORMAT(students_category.data_begin, '%Y-%m-%d %H:%i:%S') data_begin, DATE_FORMAT(students_category.data_end, '%Y-%m-%d %H:%i:%S') data_end FROM students_category, category WHERE category.id_category = students_category.id_category AND students_category.id_student=? AND students_category.id_category = ?";
  
  connection.query(sql_find_category, [id_student, id_category], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data[0]);
      response.render("edit_student_category.hbs", { 
        student_category: data[0],
        category: id_category,
        student: id_student,
      });
    }
  });
})

app.post("/form_edit_student_category", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const sql_update_student_category = "UPDATE students_category SET data_begin=?, data_end=? WHERE id_category=? AND id_student=?";

  if(!req.body){
    return response.status(400).send();
  }
  
  const obj_data = req.body;  
  console.log("I am", obj_data);

  connection.query(
    sql_update_student_category, 
    [
      obj_data.data_begin,
      obj_data.data_end,
      obj_data.id_category,
      obj_data.id_student, 
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

app.get("/delete_student_category/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_student = req.query.id_student;
  const id_category = req.params.id;
  
  console.log(id_student, id_category);

  const sql_add_student_category = "DELETE FROM students_category WHERE id_student=? AND id_category=?";

  connection.query(sql_add_student_category, [id_student, id_category], (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log("Связь удалена");
      response.redirect("/groups");
    }
  });
});

/* Получение user-ов */

app.get("/users", (req, response)=>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const sql_find_users = "SELECT * FROM users";

  connection.query(sql_find_users, (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.render("users.hbs", { 
        users: data,
      });
    }
  });
});

app.get("/form_add_user", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  response.sendFile(__dirname + "/add_user.html");
})

app.get("/form_edit_user/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_user = req.params.id;
  const sql_find_student = "SELECT * FROM users WHERE id_user=?";

  connection.query(sql_find_student, [id_user], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      console.log(data);
      response.render("edit_user.hbs", { 
        user: data[0]
      });
    }
  });
})

app.post("/form_edit_user", upload.none(), (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;
  const sql_update_user = "UPDATE users SET username=?, password=?, role=? WHERE id_user=?";

  obj_data.password = bcrypt.hashSync(obj_data.password, 10);

  connection.query(
    sql_update_user, 
    [
      obj_data.username, 
      obj_data.password, 
      obj_data.role, 
      obj_data.id_user
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

app.get("/delete_user/:id", (req, response)=> {

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_user = req.params.id;
  const sql_delete_student = "DELETE FROM users WHERE id_user=?";

  connection.query(sql_delete_student, [id_user], (err, data) =>{
    if(err){ 
      console.log(err);
      return response.status(400).json({ message: "Ошибка БД" });
    }else{
      response.redirect("/users");
    }
  });
})

/* Для обычных User-ов */

app.get("/available_benefits/:id", (req, response) =>{

  const has_role = Valide_role(req);
  
  if(!has_role){ // Если ошибка
    return response.status(200).json({ message: "У вас нет досутпа" })
  }

  const id_student = req.params.id;

  const sql_find_all_available_benefits_for_student  = "SELECT DISTINCT benefits.name_ben FROM benefits, category, students_category, category_benefits WHERE students_category.id_category = category.id_category AND students_category.id_student = ? AND category_benefits.id_category = category.id_category AND category_benefits.id_benefits = benefits.id_benefits AND benefits.first_time < CURTIME() AND benefits.last_time > CURTIME() AND benefits.data_begin < NOW() AND benefits.data_end > NOW()";

  function Convert_json(data){

    const unique_name = [];
  
    const json = data
    .sort((item_1, item_2)=>{
      return item_1.rank_category - item_2.rank_category; 
    })
    .filter((item) => {
      if(!unique_name.includes(item.name_benefits)){
        unique_name.push(item.name_benefits);
        return item;
      }
    });
  
    return json;
  }

  connection.query(sql_find_all_available_benefits_for_student, [id_student], (err, data) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }else{
      console.log(data);
      const json = Convert_json(data);
      return response.status(400).json({ message: json });
    }
  });

})

/* Регистрация / Авторизация */

app.post("/registration", upload.none(), (req, response) =>{
  
  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;
  const sql_add_user = "INSERT INTO users(username, password, role) VALUES(?, ?, ?)";

  obj_data.password = bcrypt.hashSync(obj_data.password, 10);
  let data_value = Object.values(obj_data);

  connection.query(sql_add_user, data_value, (err, res) =>{
    if(err){
      console.log(err);
      return response.status(400).json({ message: "Ошибка с БД" });
    }
    response.status(200).json({ message: "Пользоваетль добавлен" });
  });

});

app.post("/login", upload.none(), (req, response) =>{
  if(!req.body){
    return response.status(400).send();
  }

  const obj_data = req.body;
  
  function Find_or_Login(){
    const sql_find_user = "SELECT * FROM users WHERE username=?";
    connection.query(sql_find_user, [obj_data.username], (err, data) =>{
      if(err){ 
        console.log(err);
        response.clearCookie("token");
        return response.status(400).json({ message: "Ошибка БД" });
      }else if(data.length !== 0){
        Login(data);
        return;
      }else{
        response.clearCookie("token");
        return response.status(400).json({ message: "Пользователь не найден" });
      }
    });
  }

  function Login(data){
    let valid_password = bcrypt.compareSync(obj_data.password, data[0].password);
    if(!valid_password){
      response.clearCookie("token");
      return response.status(400).json({ message: "Пароль неправильный" });
    }
    const token = Generate_access_token(data[0].id, data[0].role);

    console.log("response: ", token);

    response.cookie("token", token, {
      httpOnly: true
    });

    return response.status(200).json({ message: "Куки" });
  }

  Find_or_Login();
})

app.listen(3000, () =>{ console.log("Сервер запущен...") });