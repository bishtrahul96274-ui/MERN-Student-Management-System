var express=require('express');
var multer=require('multer')
var path=require('path')
var fs=require('fs')
var app=express()
var PORT=process.env.PORT || 5000
var uploadDir=path.join(__dirname,'uploads')

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadDir)
    },
    filename:function(req,file,cb){
        var ext=path.extname(file.originalname)
        cb(null,Date.now() + '-' + Math.round(Math.random() * 1E9) + ext)
    }
})
var upload=multer({storage:storage})

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS')
    res.header('Access-Control-Allow-Headers','Content-Type')
    if(req.method === 'OPTIONS'){
        return res.sendStatus(204)
    }
    next()
})
app.use(express.json())
app.use('/uploads',express.static(uploadDir))
var data=[
    {"id":101,"name":"A","course":"MCA","image":""},
    {"id":102,"name":"B","course":"MCA","image":""},
    {"id":103,"name":"C","course":"MCA","image":""},
    {"id":104,"name":"D","course":"MCA","image":""},
    {"id":105,"name":"E","course":"MCA","image":""},
    {"id":106,"name":"F","course":"MCA","image":""}
    
]

app.get("/",function(req,res){
    res.send(data)
})

app.post("/students",upload.single('image'),function(req,res){
    var id=Number(req.body.id)
    var student={
        id:id,
        name:req.body.name,
        course:req.body.course,
        image:req.file ? '/uploads/' + req.file.filename : ''
    }

    if(!student.id || !student.name || !student.course){
        return res.status(400).send({message:'ID, name, and course are required'})
    }

    if(data.some(function(item){ return item.id === student.id })){
        return res.status(409).send({message:'Student ID already exists'})
    }

    data.push(student)
    res.status(201).send(student)
})

app.put("/students/:id",upload.single('image'),function(req,res){
    var id=Number(req.params.id)
    var student=data.find(function(item){ return item.id === id })

    if(!student){
        return res.status(404).send({message:'Student not found'})
    }

    student.name=req.body.name || student.name
    student.course=req.body.course || student.course
    if(req.file){
        student.image='/uploads/' + req.file.filename
    }

    res.send(student)
})

app.listen(PORT,function(){
    console.log("Server running on port " + PORT)
})
