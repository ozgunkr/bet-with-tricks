using BetAnalytics.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BetAnalytics.Controllers
{
    public class BetMasterController : Controller
    {
        private BAEntities db = new BAEntities();


        // Classes For Insert Bets 
        public class BETDETAIL
        {
            public string preference { get; set; }
            public string trust { get; set; }
            public string ratio { get; set; }
            public string possibility { get; set; }
            public string game_code { get; set; }
            public string game_name { get; set; }
            public DateTime game_date { get; set; }
            public string game_day_prompt { get; set; }
        }

        public class BETMASTER
        {
            public string bet_name { get; set; }
            public string is_active { get; set; }
            public string description { get; set; }
            public List<BETDETAIL> BETDETAIL { get; set; }
        }


        // Classes For Update Bets 
        public class BETDETAILUPDATE
        {
            public int id { get; set; }
            public int bet_id { get; set; }
            public string preference { get; set; }
            public string trust { get; set; }
            public string ratio { get; set; }
            public string possibility { get; set; }
            public string game_code { get; set; }
            public string game_name { get; set; }
        }

        public class BETMASTERUPDATE
        {
            public int id { get; set; }
            public string bet_name { get; set; }
            public string is_active { get; set; }
            public string description { get; set; }
            public List<BETDETAILUPDATE> BETDETAILUPDATE { get; set; }
        }

        // GET: BetMaster
        /*  public ActionResult Index()
          {
              return View(db.t_bet_master.ToList());
          }*/

        /*
          *********************************************************
          ******************** Customs Begin ************************
          *********************************************************
         */

        public JsonResult GetBets()
        {
            // var result = db.t_bet_master.ToList();

            var dataset = db.t_bet_master
    //.Where(x => x.environmentID == environmentid && x.ProcessName == processname && x.RemoteIP == remoteip && x.CommandLine == commandlinepart)
    .Select(x => new { x.id, x.bet_name, x.is_active, x.create_date, x.description }).ToList();
            return Json(dataset, JsonRequestBehavior.AllowGet);

        }

        // Save Bets and Details
        [HttpPost]
        public JsonResult SaveBets(List<BETMASTER> data)
        {
            DateTime Now = DateTime.Now;

            
            t_bet_master _betmaster = new t_bet_master();
            _betmaster.create_date = Now;
            _betmaster.id = 0;
            _betmaster.bet_name = data[0].bet_name;
            _betmaster.is_active = data[0].is_active;
            _betmaster.description = data[0].description;

            db.t_bet_master.Add(_betmaster);

            int BetId = _betmaster.id;


            List<BETDETAIL> bet_details = data[0].BETDETAIL;

            foreach (BETDETAIL obj in bet_details)
            {

                string GameDay = (obj.game_date.ToString("dd"));

                string GameDayName = (obj.game_date.ToString("dddd",
                            new CultureInfo("tr-TR")));

                string GameMonth = (obj.game_date.ToString("MMMM",
                            new CultureInfo("tr-TR")));

                string FullGameDay = GameDay + " " + GameMonth + ", " + GameDayName;


                t_bet_detail _betdetail = new t_bet_detail();
                _betdetail.bet_id = BetId;
                _betdetail.preference = obj.preference;
                _betdetail.trust = obj.trust;
                _betdetail.ratio = obj.ratio;
                _betdetail.possibility = obj.possibility;
                _betdetail.game_code = obj.game_code;
                _betdetail.game_name = obj.game_name;
                _betdetail.game_date = obj.game_date;
                _betdetail.game_date_prompt = FullGameDay;


                db.t_bet_detail.Add(_betdetail);
            }

            db.SaveChanges();

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        // GET: BetMaster/Details/5
        public JsonResult GetBetMasterByID(int? gid)
        {
            var results = from m in db.t_bet_master
                          where m.id == gid
                          select new
                          {
                              id = m.id,
                              bet_name = m.bet_name,
                              is_active = m.is_active,
                              description = m.description,
                              create_date = m.create_date
                          };


            return Json(results, JsonRequestBehavior.AllowGet);
        }


        // GET: BetMaster/Details/5
        public JsonResult GetBetDetailByID(int? gid)
        {
            var results = from m in db.t_bet_detail
                          where m.bet_id == gid
                          select new
                          {
                              id = m.id,
                              bet_id = m.bet_id,
                              preference = m.preference,
                              trust = m.trust,
                              ratio = m.ratio,
                              possibility = m.possibility,
                              game_code = m.game_code,
                              game_name = m.game_name,
                              game_date = m.game_date,
                              game_date_prompt = m.game_date_prompt
                          };


            return Json(results, JsonRequestBehavior.AllowGet);
        }

       
        // POST: Bets/Delete/5
        [HttpPost]
        public JsonResult DeleteBetsByID(int bet_id)
        {


            // DELETE BET DETAIL
            var result1 = from d in db.t_bet_detail where d.bet_id == bet_id select d;
            //check if there is a record with this id

            if (result1.Count() > 0)

            {

                foreach (t_bet_detail x in result1)
                {
                    db.t_bet_detail.Remove(x);
                }
                db.SaveChanges();
            }


            // DELETE BET MASTER
            var result2 = from m in db.t_bet_master where m.id == bet_id select m;
            //check if there is a record with this id

            if (result2.Count() > 0)

            {

                foreach (t_bet_master y in result2)
                {
                    db.t_bet_master.Remove(y);
                }
                db.SaveChanges();
            }

            return Json(JsonRequestBehavior.AllowGet);
        }


        // POST: BetDetail/Delete/5
        [HttpPost]
        public JsonResult DeleteBetsDetailByID(int id)
        {

            var result = from d in db.t_bet_detail where d.id == id select d;
            //check if there is a record with this id

            if (result.Count() > 0)

            {

                foreach (t_bet_detail x in result)
                {
                    db.t_bet_detail.Remove(x);
                }
                db.SaveChanges();
            }




            return Json(JsonRequestBehavior.AllowGet);
        }

        //Update Bets
        [HttpPost]
        public JsonResult UpdateBet(List<BETMASTERUPDATE> data)
        {
            var id = data[0].id;

            // Update t_bet_master 
            var update1 = from t in db.t_bet_master where t.id == id select t;

            if (update1.Count() > 0)

            {

                foreach (t_bet_master y in update1)
                {
                    y.bet_name = data[0].bet_name;
                    y.is_active = data[0].is_active;
                    y.description = data[0].description;
                }
                db.SaveChanges();
            }



            // Update t_bet_detail
            List<BETDETAILUPDATE> bet_details = data[0].BETDETAILUPDATE;


            foreach (BETDETAILUPDATE obj in bet_details)
            {
                var update2 = from s in db.t_bet_detail where s.id == obj.id select s;

                if (update2.Count() > 0)

                {

                    foreach (t_bet_detail z in update2)
                    {
                        z.preference = obj.preference;
                        z.trust = obj.trust;
                        z.ratio = obj.ratio;
                        z.possibility = obj.possibility;
                        z.game_code = obj.game_code;
                        z.game_name = obj.game_name;
                    }
                    db.SaveChanges();
                }

                else if (update2.Count() <= 0)
                {


                    t_bet_detail _betdetail = new t_bet_detail();
                    _betdetail.bet_id = id;
                    _betdetail.preference = obj.preference;
                    _betdetail.trust = obj.trust;
                    _betdetail.ratio = obj.ratio;
                    _betdetail.possibility = obj.possibility;
                    _betdetail.game_code = obj.game_code;
                    _betdetail.game_name = obj.game_name;


                    db.t_bet_detail.Add(_betdetail);

                    db.SaveChanges();
                }
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