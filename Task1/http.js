import http from 'http';
const users=[{ id: 1, name: "Hayam Mostafa" }, { id: 2, name: "Hager" }];
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
            }
            res.end(JSON.stringify({
                message: "User Deleted", users
            }));
        });

    }
    // get by id
   else if (req.method === "GET" && req.url.startsWith("/user")) {
    const id = Number(req.url.split("=")[1]);
    const user = users.find(user => user.id === id);
    if (user) {
        res.end(JSON.stringify(user));
    } else {
        res.end(JSON.stringify({ message: "User not found" }));
    }

}
        else {
            res.end(JSON.stringify({ message: "route not found" }));
        }
            
    })
server.listen(3000, () => {console.log("server is running on port 3000")});