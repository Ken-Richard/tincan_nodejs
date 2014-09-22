//
// Registration Class
//

function Context() {

}

exports.build = function(req) {

  var c = new Context();
  c.registrationId  = req.tcapi_param('registration');
  c.activityId      = req.tcapi_param('activityId');
  c.stateId         = req.tcapi_param('stateId');
  c.statementId     = req.tcapi_param('statementId');

  c.actor = req.tcapi_param('actor');
  if (c.actor == null) {
    c.actor = req.tcapi_param('agent');
  }

  if (c.registrationId==null && c.actor) {
    var actor = JSON.parse(c.actor);
    c.registrationId = actor.registration;
  }

  return c;
}
