import http from 'http';
import fs from 'fs';
const users = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
const server = http.createServer(
    (req, res) => {
        res.setHeader("Content-Type", "application/json");
        //get
        if (req.url === "/users"&& req.method === "GET") {
            res.end(JSON.stringify(users));
        }
        //post
        else if (req.url === "/users" && req.method === "POST") {
         let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
          req.on("end", () => {
            const newUser = JSON.parse(body);
            users.push(newUser);
            fs.writeFileSync("db.json", JSON.stringify(users));
            res.end(JSON.stringify({
                message: "User Added",
                users
            }));

        });

    }

    //put
     else if (req.url === "/users" && req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const updatedUser = JSON.parse(body);
            const index = users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                users[index] = updatedUser;
                fs.writeFileSync("db.json", JSON.stringify(users, null, 4));
            }
            res.end(JSON.stringify({
                message: "User Updated",
                users
            }));

        });

    }
    // delete
    else if (req.url === "/users" && req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const deletedUser = JSON.parse(body);
            const index = users.findIndex(user => user.id === deletedUser.id);
            if (index !== -1) {
                users.splice(index, 1);
                fs.writeFileSync("db.json", JSON.stringify(users, null, 4));
            }
            res.end(JSON.stringify({
                message: "User Deleted", users
            }));
        });

    }
   
    })
server.listen(3000, () => {console.log("server is running on port 3000")});