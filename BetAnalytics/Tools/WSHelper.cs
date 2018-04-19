using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BetAnalytics.Tools
{
    public static class WSHelper
    {

        public static string GetJson(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row = null;

            int i = 0;

            foreach (DataRow dr in dt.Rows)
            {
                i++;
                if (i == 10000)
                    break;


                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            return serializer.Serialize(rows);
        }
    }
}