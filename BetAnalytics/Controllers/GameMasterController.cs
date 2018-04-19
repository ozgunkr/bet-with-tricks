using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using BetAnalytics.Models;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Globalization;

namespace BetAnalytics.Controllers
{
    public class GameMasterController : Controller
    {
        private BAEntities db = new BAEntities();


        // Classes For Insert Games 
        public class GAMEDETAIL
        {
            public string preference { get; set; }
            public string trust { get; set; }
            public string ratio { get; set; }
            public string possibility { get; set; }
            public string region { get; set; }
            public string game_code { get; set; }
        }

        public class RootObject
        {
            public string game_name { get; set; }
            public string image { get; set; }
            public string is_active { get; set; }
            public string description { get; set; }
            public string category { get; set; }
            public string sub_category { get; set; }
            public string priority { get; set; }
            public DateTime game_date { get; set; }
            public string game_day { get; set; }
            public string game_day_prompt { get; set; }
            public string game_preference { get; set; }
            public List<GAMEDETAIL> GAMEDETAIL { get; set; }
        }


        // Classes For Update Games 
        public class GAMEUPDATEDETAIL
        {
            public int game_detail_id { get; set; }
            public int game_id { get; set; }
            public string preference { get; set; }
            public string trust { get; set; }
            public string ratio { get; set; }
            public string possibility { get; set; }
            public string region { get; set; }
            public string game_code { get; set; }
        }

        public class UpdateGames
        {
            public int id { get; set; }
            public string game_name { get; set; }
            public string image { get; set; }
            public string is_active { get; set; }
            public string description { get; set; }
            public string category { get; set; }
            public string sub_category { get; set; }
            public string priority { get; set; }
            public List<GAMEUPDATEDETAIL> GAMEUPDATEDETAIL { get; set; }
        }

        // GET: GameMaster
        /*  public ActionResult Index()
          {
              return View(db.t_game_master.ToList());
          }*/

        /*
          *********************************************************
          ******************** Customs Begin ************************
          *********************************************************
         */

        public JsonResult GetGames()
        {
            // var result = db.t_game_master.ToList();

            var dataset = db.t_game_master
    //.Where(x => x.environmentID == environmentid && x.ProcessName == processname && x.RemoteIP == remoteip && x.CommandLine == commandlinepart)
    .Select(x => new { x.id, x.game_name, x.image, x.is_active, x.create_date, x.description, x.category, x.sub_category, x.priority, x.game_date, x.game_day, x.game_day_prompt, x.game_preference, x.current_state }).ToList();
            return Json(dataset, JsonRequestBehavior.AllowGet);

        }

        // Save Games and Details
        [HttpPost]
        public JsonResult SaveGames(List<RootObject> data)
        {
            DateTime Now = DateTime.Now;

            string GameDayNamePrompt = (data[0].game_date.ToString("dddd",
                        new CultureInfo("en-EN")));

            string GameDay = (data[0].game_date.ToString("dd"));

            string GameDayName = (data[0].game_date.ToString("dddd",
                        new CultureInfo("tr-TR")));

            string GameMonth = (data[0].game_date.ToString("MMMM",
                        new CultureInfo("tr-TR")));

            string FullGameDay = GameDay + " " + GameMonth + ", " + GameDayName;

            ////////////// SET GAME PREFERENCE //////////////////


            List<GAMEDETAIL> game_details = data[0].GAMEDETAIL;

            int maxPossibility = int.MinValue;
            string DetailPreference = "";

            foreach (GAMEDETAIL type in game_details)
            {
                int prefDetail = Convert.ToInt32(type.possibility);
                if (prefDetail > maxPossibility)
                {
                    maxPossibility = prefDetail;
                }
            }

            foreach (GAMEDETAIL obj in game_details)
            {

                if (obj.possibility == Convert.ToString(maxPossibility))
                {
                    DetailPreference = obj.preference;
                }
               
            }
            //////////////////////////////////////////////////////
            

            t_game_master _gamemaster = new t_game_master();
            _gamemaster.create_date = Now;
            _gamemaster.id = 0;
            _gamemaster.game_name = data[0].game_name;
            _gamemaster.image = data[0].image;
            _gamemaster.is_active = data[0].is_active;
            _gamemaster.category = data[0].category;
            _gamemaster.sub_category = data[0].sub_category;
            _gamemaster.description = data[0].description;
            _gamemaster.priority = data[0].priority;
            _gamemaster.game_date = data[0].game_date;
            _gamemaster.game_day_prompt = GameDayNamePrompt;
            _gamemaster.game_day = FullGameDay;
            _gamemaster.game_preference = DetailPreference + " - " + Convert.ToString(maxPossibility);

            db.t_game_master.Add(_gamemaster);

            int GameId = _gamemaster.id;

            

            foreach (GAMEDETAIL obj in game_details)
            {

                t_game_detail _gamedetail = new t_game_detail();
                _gamedetail.game_id = GameId;
                _gamedetail.preference = obj.preference;
                _gamedetail.trust = obj.trust;
                _gamedetail.ratio = obj.ratio;
                _gamedetail.possibility = obj.possibility;
                _gamedetail.region = obj.region;
                _gamedetail.game_code = obj.game_code;


                db.t_game_detail.Add(_gamedetail);
            }

            db.SaveChanges();
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        // GET: GameMaster/Details/5
        public JsonResult GetGameMasterByID(int? gid)
        {
            var results = from m in db.t_game_master
                          where m.id == gid
                          select new
                          {
                              id = m.id,
                              game_name = m.game_name,
                              image = m.image,
                              is_active = m.is_active,
                              description = m.description,
                              category = m.category,
                              sub_category = m.sub_category,
                              priority = m.priority
                          };


            return Json(results, JsonRequestBehavior.AllowGet);
        }


        // GET: GameMaster/Details/5
        public JsonResult GetGameDetailByID(int? gid)
        {
            var results = from m in db.t_game_detail
                          where m.game_id == gid
                          select new
                          {
                              game_detail_id = m.game_detail_id,
                              game_id = m.game_id,
                              preference = m.preference,
                              trust = m.trust,
                              ratio = m.ratio,
                              possibility = m.possibility,
                              region = m.region,
                              game_code = m.game_code,
                          };


            return Json(results, JsonRequestBehavior.AllowGet);
        }

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

            var path = Server.MapPath(@"~/Templates/GameImages/");

            var saveToFileLoc = path + fileName;
            //var saveToFileLoc = "C:/Users/Özgün/Desktop/BetAnalytics/BetAnalytics/Templates/GameImages/" + fileName;
            var fileStream = new FileStream(saveToFileLoc, FileMode.Create, FileAccess.ReadWrite);
            fileStream.Write(bytes, 0, length);
            fileStream.Close();

            return string.Format("{0} bytes uploaded", bytes.Length);
        }

        // POST: Games/Delete/5
        [HttpPost]
        public JsonResult DeleteGamesByID(int game_id)
        {


            // DELETE GAME DETAIL
            var result1 = from d in db.t_game_detail where d.game_id == game_id select d;
            //check if there is a record with this id

            if (result1.Count() > 0)

            {

                foreach (t_game_detail x in result1)
                {
                    db.t_game_detail.Remove(x);
                }
                db.SaveChanges();
            }


            // DELETE GAME MASTER
            var result2 = from m in db.t_game_master where m.id == game_id select m;
            //check if there is a record with this id

            if (result2.Count() > 0)

            {

                foreach (t_game_master y in result2)
                {
                    db.t_game_master.Remove(y);
                }
                db.SaveChanges();
            }

            return Json(JsonRequestBehavior.AllowGet);
        }


        // POST: GameDetail/Delete/5
        [HttpPost]
        public JsonResult DeleteGameDetailByID(int game_detail_id)
        {

            var result = from d in db.t_game_detail where d.game_detail_id == game_detail_id select d;
            //check if there is a record with this id

            if (result.Count() > 0)

            {

                foreach (t_game_detail x in result)
                {
                    db.t_game_detail.Remove(x);
                }
                db.SaveChanges();
            }




            return Json(JsonRequestBehavior.AllowGet);
        }

        //Update Games
        [HttpPost]
        public JsonResult UpdateGame(List<UpdateGames> data)
        {
            var id = data[0].id;

            // Update t_game_master 
            var update1 = from t in db.t_game_master where t.id == id select t;

            if (update1.Count() > 0)

            {

                foreach (t_game_master y in update1)
                {
                    y.game_name = data[0].game_name;
                    y.image = data[0].image;
                    y.is_active = data[0].is_active;
                    y.category = data[0].category;
                    y.sub_category = data[0].sub_category;
                    y.description = data[0].description;
                    y.priority = data[0].priority;
                }
                db.SaveChanges();
            }



            // Update t_game_detail
            List<GAMEUPDATEDETAIL> game_details = data[0].GAMEUPDATEDETAIL;


            foreach (GAMEUPDATEDETAIL obj in game_details)
            {
                var update2 = from s in db.t_game_detail where s.game_detail_id == obj.game_detail_id select s;

                if (update2.Count() > 0)

                {

                    foreach (t_game_detail z in update2)
                    {
                        z.preference = obj.preference;
                        z.trust = obj.trust;
                        z.ratio = obj.ratio;
                        z.possibility = obj.possibility;
                        z.region = obj.region;
                        z.game_code = obj.game_code;
                    }
                    db.SaveChanges();
                }

                else if (update2.Count() <= 0)
                {


                    t_game_detail _gamedetail = new t_game_detail();
                    _gamedetail.game_id = id;
                    _gamedetail.preference = obj.preference;
                    _gamedetail.trust = obj.trust;
                    _gamedetail.ratio = obj.ratio;
                    _gamedetail.possibility = obj.possibility;
                    _gamedetail.region = obj.region;
                    _gamedetail.game_code = obj.game_code;


                    db.t_game_detail.Add(_gamedetail);

                    db.SaveChanges();
                }
            }

            return Json(JsonRequestBehavior.AllowGet);
        }


        /*
         *********************************************************
         ******************** Customs End ************************
         *********************************************************
        */

        // GET: GameMaster/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            t_game_master t_game_master = db.t_game_master.Find(id);
            if (t_game_master == null)
            {
                return HttpNotFound();
            }
            return View(t_game_master);
        }

        // GET: GameMaster/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: GameMaster/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,game_name,image,create_date")] t_game_master t_game_master)
        {
            if (ModelState.IsValid)
            {
                db.t_game_master.Add(t_game_master);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(t_game_master);
        }

        // GET: GameMaster/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            t_game_master t_game_master = db.t_game_master.Find(id);
            if (t_game_master == null)
            {
                return HttpNotFound();
            }
            return View(t_game_master);
        }

        // POST: GameMaster/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,game_name,image,create_date")] t_game_master t_game_master)
        {
            if (ModelState.IsValid)
            {
                db.Entry(t_game_master).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(t_game_master);
        }

        // GET: GameMaster/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            t_game_master t_game_master = db.t_game_master.Find(id);
            if (t_game_master == null)
            {
                return HttpNotFound();
            }
            return View(t_game_master);
        }

        // POST: GameMaster/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            t_game_master t_game_master = db.t_game_master.Find(id);
            db.t_game_master.Remove(t_game_master);
            db.SaveChanges();
            return RedirectToAction("Index");
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
