using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BetAnalytics
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
            "admin_admin", // Route name
            "Admin/{action}", // URL with parameters
            new { controller = "Admin", action = "Index", id = UrlParameter.Optional } // Parameter defaults
        );

            routes.MapRoute(
           "admin_account", // Route name
           "Account/Login/{id}", // URL with parameters
           new { controller = "Account", action = "Login", id = UrlParameter.Optional } // Parameter defaults
       );

            routes.MapRoute(
           "game_master", // Route name
           "GameMaster/{action}/{id}", // URL with parameters
           new { controller = "GameMaster", action = "GetGames", id = UrlParameter.Optional } // Parameter defaults
       );

            routes.MapRoute(
           "article_master", // Route name
           "ArticleMaster/{action}/{id}", // URL with parameters
           new { controller = "ArticleMaster", action = "GetArticles", id = UrlParameter.Optional } // Parameter defaults
       );

            routes.MapRoute(
           "bet_master", // Route name
           "BetMaster/{action}/{id}", // URL with parameters
           new { controller = "BetMaster", action = "GetBets", id = UrlParameter.Optional } // Parameter defaults
       );

            routes.MapRoute(
           "contact_page_save", // Route name
           "Contact/SaveContact/{id}", // URL with parameters
           new { controller = "Contact", action = "SaveContact", id = UrlParameter.Optional } // Parameter defaults
       );

            routes.MapRoute(
            "contact_page_get", // Route name
            "Contact/GetContacts/{id}", // URL with parameters
            new { controller = "Contact", action = "GetContacts", id = UrlParameter.Optional } // Parameter defaults
        );

            routes.MapRoute(
                name: "Default",
                url: "{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            
           
           
        }
    }
}
