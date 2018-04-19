using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BetAnalytics.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        // GET: Admin
        public ActionResult Articles()
        {
            return View();
        }

        // GET: Admin
        public ActionResult Bets()
        {
            return View();
        }

        // GET: Admin
        public ActionResult Games()
        {
            return View();
        }

        // GET: Admin
        public ActionResult Contacts()
        {
            return View();
        }
        // GET: Admin
        public ActionResult GameProcess()
        {
            return View();
        }
        // GET: Admin
        public ActionResult ArticleProcess()
        {
            return View();
        }

        // GET: Admin
        public ActionResult BetProcess()
        {
            return View();
        }

        // GET: Admin
        public ActionResult ImgUpload()
        {
            return View();
        }
        // GET: Admin
        public ActionResult ArticleImgUpload()
        {
            return View();
        }
    }
}