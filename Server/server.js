const express = require('express');
const bodyParser = require('body-parser');
const { getConnectionUserDetails, getConnectionMilkDetails } = require('./database');

const eobj = express();
const port = 5100;

eobj.use(bodyParser.json());

eobj.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
  next();
});

eobj.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
  main();
  main1();
});

async function main() {
  let ret;
  ret = await getConnectionUserDetails();
}

async function main1() {
  let ret;
  ret = await getConnectionMilkDetails();
}


async function postData(userdata)
{
    let data=await getConnectionUserDetails();
    let result=await data.insertOne(userdata)
    if(result.acknowledged)
    {
        console.log("Data posted on database successfully...!")
    }
}



eobj.post("/userDetails",postUserDetails);

async function postUserDetails(req,res)
{
    userdata=req.body;
    console.log("data recieved from client",userdata)
    let data=await getConnectionUserDetails();

    const user = await data.findOne({ 'MobileNo':userdata.MobileNo });

    console.log(user)

    if(user===null)
    {
        let result=await data.insertOne(userdata)
        if(result.acknowledged)
        {
            console.log("Data post on server: ",result);
        }
        return res.json({ message: 'User Created successfully' });
    }
    else
    {
        if(user.UserID==userdata.UserID)
        {
            console.log("MobileNo and UserID already exist")
            return res.status(402).json({ message: 'MobileNo and UserID already exist' });
        }
        else
        {
            console.log("MobileNo already exist")
            return res.status(401).json({ message: 'User already exist' });
        }      
    }

}

eobj.post("/LoginDetails",postLoginDetails)

async function postLoginDetails(req,res)
{
    data=req.body;
    console.log(data.MobileNo);
    console.log(data.Password);
    //result=ValidateLoginDetails(data.MobileNo,data.Password);
    let client=await getConnectionUserDetails();
    const user = await client.findOne({ 'MobileNo':data.MobileNo });
    console.log(user)
    if(user===null)
    {
        console.log("MobileNo not matched")
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    else
    {
        if(user.Password==data.Password)
        {
            console.log("MobileNo matched")
            return res.json({ message: 'Login successful' });
        }
        else
        {
            console.log("Incorrect Password")
            return res.status(401).json({ message: 'Invalid username or password' });
        }        
    }
}

eobj.get('/userDetails/allUserDetails',GetUserDetails)

async function GetUserDetails(req,res)
{
    const data=req.body;
    let client=await getConnectionUserDetails();
    let user=await client.find().toArray();
    res.json(user);
}

eobj.get('/userDetails/byMobileNo',GetUserDetailsByMobileNo)

async function GetUserDetailsByMobileNo(req,res)
{
    console.log("Inside getUserdetails")
    let data=req.query.MobileNo;
    console.log(data)
    let client=await getConnectionUserDetails();
    const user = await client.findOne({ 'MobileNo':data });
    console.log("Data fetched from database is",user)
    if(user===null)
    {
        console.log("MobileNo not matched")
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    else
    {
        return res.json(user)       
    }
    res.json(user)
}


eobj.post("/milkDetails",postMilkDetails)

async function postMilkDetails(req,res)
{
    const milkData=req.body;

    let data= await getConnectionMilkDetails();
    let result=await data.insertOne(milkData);

    if(result.acknowledged)
    {
        console.log("Data inserted on database",result)
    }
    res.json("MilDetails added successfully")
}



eobj.get('/milkDetails/byMobileNo',GetMilkDetailsByMobileNo)

async function GetMilkDetailsByMobileNo(req,res)
{
    milkdetails=[];
    console.log("Inside getUserdetails")
    let data=req.query.MobileNo;
    console.log(data)
    let client=await getConnectionMilkDetails();
    const cursor = await client.find({ 'MobileNo':data });
    //console.log("Data fetched from database is",user)
    const result = await cursor.toArray();
    console.log(" Into array:  " ,result)
    if(cursor===null)
    {
        console.log("MobileNo not matched")
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    else
    {
        console.log("Insidethe else",cursor)
        await result.forEach(doc => 
            {
                milkdetails.push(doc);
                //console.log(doc);
            // Do something with each document (doc)
          });
        return res.json(milkdetails)     
    }
     
    //res.json(user)
}