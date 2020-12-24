
/*
 * GET home page.
 */
 
var titlePrefix = {nl: "Accordeonles Den Haag - ", en: "Accordion lessons The Hague - "},
    hostname = "http://www.accordeonlesdenhaag.nl/";

function genericAction(settings){
  this.action = function(req, res){
    var options = settings.beforeRender ? settings.beforeRender(settings) : {};
    if(!options.title) options.title = settings.title || '';
    options.hostname = hostname;
    if(settings.otherL) options.otherL = settings.otherL;
    if(!options.altpath) res.render(options.view || settings.view, options); 
  };
}

var dutchLookups = {
  index: new genericAction({
    view: 'indexNL',
    title: titlePrefix.nl + 'Home',
    otherL: '/en/'}),
  bosz: new genericAction({
    view: 'boszNL',
    title: titlePrefix.nl + 'Bosz de Kler',
    otherL: '/en/bosz' }),
  accordeon: new genericAction({
    view: 'accordeon',
    title: titlePrefix.nl + 'Over de accordeon',
    otherL: '/en/accordion'}),
  volwassenen: new genericAction({
    view: 'volwassenen',
    title: titlePrefix.nl + 'Volwassenen',
    otherL: '/en/adults'}),
  kinderen: new genericAction({
    view: 'kinderen',
    title: titlePrefix.nl + 'Kinderen',
    otherL: '/en/kids'}),
  voorwaarden: new genericAction({
    view: 'voorwaarden',
    title: titlePrefix.nl + 'Voorwaarden',
    otherL: '/en/terms'}),
  tarieven: new genericAction({
    view: 'tarieven',
    title: titlePrefix.nl + 'Tarieven',
    otherL: '/en/prices'}),
  contact: new genericAction({
    view: 'contactNL',
    title: titlePrefix.nl + 'Contact',
    otherL: '/en/contact'})
};
var englishLookups = {
  index: new genericAction({
    view: 'indexEN' ,
    title: titlePrefix.en + 'Home',
    otherL: '/nl/'}),
  bosz: new genericAction({
    view: 'boszEN',
    title: titlePrefix.en + 'Bosz de Kler',
    otherL: '/nl/bosz'}),
  accordion: new genericAction({
    view: 'accordion',
    title: titlePrefix.en + 'the Accordion',
    otherL: '/nl/accordeon'}),
  adults: new genericAction({
    view: 'adults',
    title: titlePrefix.en + 'Adults',
    otherL: '/nl/volwassenen'}),
  kids: new genericAction({
    view: 'kids',
    title: titlePrefix.en + 'Kids',
    otherL: '/nl/kinderen'}),
  terms: new genericAction({
    view: 'terms',
    title: titlePrefix.en + 'Terms',
    otherL: '/nl/voorwaarden'}),
  prices: new genericAction({
    view: 'prices',
    title: titlePrefix.en + 'Prices',
    otherL: '/nl/tarieven'}),
  contact: new genericAction({
    view: 'contactEN',
    title: titlePrefix.en + 'Contact',
    otherL: '/nl/contact'})
}

exports.nl = {};
exports.en = {};
for(var route in dutchLookups){
  exports.nl[route] = dutchLookups[route].action;
}
for(var route in englishLookups){
  exports.en[route] = englishLookups[route].action;
}

//exports.index = function(req, res){
//  res.render('index', { title: titlePrefix + 'Home' });
//};
//
//exports.bosz = function(req, res){
//  res.render('bosz', { title: titlePrefix + 'Bosz de Kler' });
//};