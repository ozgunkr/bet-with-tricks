using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BetAnalytics.Controllers
{
    public class HomeController : Controller
    {
       
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BetList()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Blog()
        {

            return View();
        }

        public ActionResult Donate()
        {

            return View();
        }

        public ActionResult AllGames()
        {

            return View();
        }

        public ActionResult ToU()
        {

            return View();
        }

        public ActionResult BlogDetails(string id)
        {
            ViewBag.Message = id;

            return View();
        }

    }
}