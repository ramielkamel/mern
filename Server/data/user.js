import bycrpt from "bcryptjs"
const users = [
    {
        name:"Admin",
        email:"admin@admin.com",
        password: bycrpt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name:"User",
        email:"user@user.com",
        password: bycrpt.hashSync("123456", 10),
    },
    
  ];
  
  export default users;