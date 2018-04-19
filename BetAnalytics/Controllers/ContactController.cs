using BetAnalytics.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BetAnalytics.Controllers
{
    public class ContactController : Controller
    {

        private BAEntities db = new BAEntities();

        public JsonResult GetContacts()
        {

            var dataset = db.t_contacts
   .Select(x => new { x.id,x.name,x.email, x.comment, x.login_ip, x.create_date }).ToList();
            return Json(dataset, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult SaveContact(List<t_contacts> data)
        {

            DateTime Now = DateTime.Now;

            t_contacts _contacts = new t_contacts();
            _contacts.create_date = Now;
            _contacts.name = data[0].name;
            _contacts.email = data[0].email;
            _contacts.comment = data[0].comment;
            _contacts.login_ip = data[0].login_ip;

            db.t_contacts.Add(_contacts);

            db.SaveChanges();

            return Json(true, JsonRequestBehavior.AllowGet);

        }

    }
}