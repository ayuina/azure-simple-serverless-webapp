#r "Newtonsoft.Json"
using System;
using System.Collections;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Linq;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var prinKey = "X-MS-CLIENT-PRINCIPAL-NAME";
    var name = req.Headers.Keys.Contains(prinKey) ? req.Headers[prinKey].ToString() : "anonymous" ;

    return new OkObjectResult(new { Message = $"Success Functions api call by {name} !!!" } );


}
