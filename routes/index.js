const constructorMethod = app => {
  app.get("/", (req,res)=>{
    res.render("layouts/main")
  });

  app.use("*", (req, res) => {
    res.status(404).render("err/404");
  });
};

module.exports = constructorMethod;