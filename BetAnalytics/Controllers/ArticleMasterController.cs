using BetAnalytics.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BetAnalytics.Controllers
{
    public class ArticleMasterController : Controller
    {
        private BAEntities db = new BAEntities();

        // Upload Images 
        [HttpPost]
        public virtual string UploadFiles(object obj)
        {

            var length = Request.ContentLength;
            var bytes = new byte[length];
            Request.InputStream.Read(bytes, 0, length);

            var fileName = Request.Headers["X-File-Name"];
            var fileSize = Request.Headers["X-File-Size"];
            var fileType = Request.Headers["X-File-Type"];

            var path = Server.MapPath(@"~/Templates/ArticleImages/");

            var saveToFileLoc = path + fileName;
            //var saveToFileLoc = "C:/Users/Özgün/Desktop/BetAnalytics/BetAnalytics/Templates/GameImages/" + fileName;
            var fileStream = new FileStream(saveToFileLoc, FileMode.Create, FileAccess.ReadWrite);
            fileStream.Write(bytes, 0, length);
            fileStream.Close();

            return string.Format("{0} bytes uploaded", bytes.Length);
        }

        // Get Article List
        public JsonResult GetArticles()
        {
            // var result = db.t_game_master.ToList();

            var dataset = db.t_article
    //.Where(x => x.environmentID == environmentid && x.ProcessName == processname && x.RemoteIP == remoteip && x.CommandLine == commandlinepart)
    .Select(x => new { x.article_id, x.article_name, x.article_category, x.image, x.is_active, x.article_content_short, x.article_content, x.language, x.create_date, x.valid_from, x.valid_to , x.author}).ToList();
            return Json(dataset, JsonRequestBehavior.AllowGet);

        }

        // GET: GameMaster/Details/5
        public JsonResult GetArticleByID(int? aid)
        {
            var results = from m in db.t_article
                          where m.article_id == aid
                          select new
                          {
                              article_id = m.article_id,
                              article_name = m.article_name,
                              article_category = m.article_category,
                              image = m.image,
                              is_active = m.is_active,
                              article_content_short = m.article_content_short,
                              article_content = m.article_content,
                              language = m.language,
                              create_date = m.create_date,
                              author = m.author,
                              //valid_from = m.valid_from,
                              //valid_to = m.valid_to
                          };


            return Json(results, JsonRequestBehavior.AllowGet);
        }

        // Save Article
        [HttpPost]
        public JsonResult SaveArticle(List<t_article> data)
        {
            DateTime Now = DateTime.Now;

            t_article _article = new t_article();
            _article.create_date = Now;
            _article.article_id = 0;
            _article.article_name = data[0].article_name;
            _article.article_category = data[0].article_category;
            _article.image = data[0].image;
            _article.is_active = data[0].is_active;
            _article.article_content_short = data[0].article_content_short;
            _article.article_content = data[0].article_content;
            _article.language = data[0].language;
            _article.valid_from = data[0].valid_from;
            _article.valid_to = data[0].valid_to;
            _article.author = data[0].author;

            db.t_article.Add(_article);
      
            db.SaveChanges();

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        // Update Article
        [HttpPost]
        public JsonResult UpdateArticle(List<t_article> data)
        {
            var id = data[0].article_id;

            // Update t_game_master 
            var update1 = from t in db.t_article where t.article_id == id select t;

            if (update1.Count() > 0)

            {

                foreach (t_article y in update1)
                {
                    y.article_name = data[0].article_name;
                    y.article_category = data[0].article_category;
                    y.image = data[0].image;
                    y.is_active = data[0].is_active;
                    y.article_content_short = data[0].article_content_short;
                    y.article_content = data[0].article_content;
                    y.language = data[0].language;
                    y.author = data[0].author;
                    //y.valid_from = data[0].valid_from;
                    //y.valid_to = data[0].valid_to;
                }
                db.SaveChanges();
            }
            

            return Json(JsonRequestBehavior.AllowGet);
        }

        // Delete Article by ID
        [HttpPost]
        public JsonResult DeleteArticleByID(int aid)
        {

            // DELETE GAME DETAIL
            var result1 = from d in db.t_article where d.article_id == aid select d;
            //check if there is a record with this id

            if (result1.Count() > 0)

            {

                foreach (t_article x in result1)
                {
                    db.t_article.Remove(x);
                }
                db.SaveChanges();
            }


            return Json(JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }


   
}