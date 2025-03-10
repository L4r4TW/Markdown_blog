const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == 0) res.redirect("/");
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  console.log("new");
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    console.log(article.slug);
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render("articles/new", { article: article });
  }
});

router.put("/:id", async (req, res) => {
  console.log("put");
  let article = await Article.findById(req.params.id);
  console.log(article);

  article.title = req.body.title;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  console.log(article);
  try {
    article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    res.render("/articles/new", { article: article });
  }
});

router.get("/edit/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == 0) res.redirect("/");
  res.render("articles/edit", { article: article });
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
