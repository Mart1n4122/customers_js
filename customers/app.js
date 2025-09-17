import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json())

let customers = [
  { id: 1, name: "Adam", email: "test1@gmail.com" },
  { id: 2, name: "Bob", email: "test2@gmail.com" },
  { id: 3, name: "Cloe", email: "test3@gmail.com" },
  { id: 4, name: "Diana", email: "test4@gmail.com" },
];

//GET ALL

app.get("/customers", (req, res) => {
  res.status(200).json(customers);
});

//GET BY ID

app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.status(200).json(customer);
});

//PUT

app.put("/customers/:id", (req, res) => {
  const id = req.params.id;
  let customer = customers.find((customer) => customer.id == id);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const index = customers.indexOf(customer);
  customer = { ...customer, name, email};
  customers[index] = customer;
  res.status(200).json(customer);
});

//POST

app.post("/customers", (req, res) => {
    const {name, email} = req.body
    if(!name || !email) {
        return res.status(400).json({message: "Invalid credentials"})
    }
    const id = customers.length ? customers[customers.length -1].id+1 : 1
    const customer = {id, name, email}
    customers.push(customer)
    res.status(201).json(customer)
})

app.delete("/customers/:id", (req, res) => {
  const id = req.params.id;
  customers = customers.filter((customer) => customer.id != id);
  res.status(200).json({ message: "Delete successful" });
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});


