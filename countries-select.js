// Add your countries data here
const countries = {
  AF: "Afganistán",
  AX: "Islas Aland",
  AL: "Albania",
  DZ: "Argelia",
  AS: "Samoa Americana",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguila",
  AQ: "Antártida",
  AG: "Antigua y Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaiyán",
  BS: "Bahamas",
  BH: "Bahréin",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Bielorrusia",
  BE: "Bélgica",
  BZ: "Belice",
  BJ: "Benin",
  BM: "islas Bermudas",
  BT: "Bután",
  BO: "Bolivia",
  BQ: "Bonaire, Sint Eustatius y Saba",
  BA: "Bosnia y Herzegovina",
  BW: "Botswana",
  BV: "Isla Bouvet",
  BR: "Brasil",
  IO: "Territorio Británico del Océano Índico",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Camboya",
  CM: "Camerún",
  CA: "Canadá",
  CV: "Cabo Verde",
  KY: "Islas Caimán",
  CF: "República Centroafricana",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Isla de Navidad",
  CC: "Islas Cocos (Keeling)",
  CO: "Colombia",
  KM: "Comoras",
  CG: "Congo",
  CD: "Congo, República Democrática del Congo",
  CK: "Islas Cook",
  CR: "Costa Rica",
  CI: "Costa de Marfil",
  HR: "Croacia",
  CU: "Cuba",
  CW: "Curazao",
  CY: "Chipre",
  CZ: "Republica checa",
  DK: "Dinamarca",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "República Dominicana",
  EC: "Ecuador",
  EG: "Egipto",
  SV: "El Salvador",
  GQ: "Guinea Ecuatorial",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Etiopía",
  FK: "Islas Falkland (Malvinas)",
  FO: "Islas Faroe",
  FJ: "Fiyi",
  FI: "Finlandia",
  FR: "Francia",
  GF: "Guayana Francesa",
  PF: "Polinesia francés",
  TF: "Territorios Franceses del Sur",
  GA: "Gabón",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Alemania",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Grecia",
  GL: "Groenlandia",
  GD: "Granada",
  GP: "Guadalupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guayana",
  HT: "Haití",
  HM: "Islas Heard y McDonald",
  VA: "Santa Sede (Estado de la Ciudad del Vaticano)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungría",
  IS: "Islandia",
  IN: "India",
  ID: "Indonesia",
  IR: "Irán (República Islámica de",
  IQ: "Irak",
  IE: "Irlanda",
  IM: "Isla del hombre",
  IL: "Israel",
  IT: "Italia",
  JM: "Jamaica",
  JP: "Japón",
  JE: "Jersey",
  JO: "Jordán",
  KZ: "Kazajstán",
  KE: "Kenia",
  KI: "Kiribati",
  KP: "República de Corea, Popular Democrática de",
  KR: "Corea, república de",
  XK: "Kosovo",
  KW: "Kuwait",
  KG: "Kirguistán",
  LA: "República Democrática Popular Lao",
  LV: "Letonia",
  LB: "Líbano",
  LS: "Lesoto",
  LR: "Liberia",
  LY: "Jamahiriya Arabe Libia",
  LI: "Liechtenstein",
  LT: "Lituania",
  LU: "Luxemburgo",
  MO: "Macao",
  MK: "Macedonia, la ex República Yugoslava de",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malasia",
  MV: "Maldivas",
  ML: "Mali",
  MT: "Malta",
  MH: "Islas Marshall",
  MQ: "Martinica",
  MR: "Mauritania",
  MU: "Mauricio",
  YT: "Mayotte",
  MX: "México",
  FM: "Micronesia, Estados Federados de",
  MD: "Moldavia, República de",
  MC: "Mónaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Marruecos",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Países Bajos",
  AN: "Antillas Holandesas",
  NC: "Nueva Caledonia",
  NZ: "Nueva Zelanda",
  NI: "Nicaragua",
  NE: "Níger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Isla Norfolk",
  MP: "Islas Marianas del Norte",
  NO: "Noruega",
  OM: "Omán",
  PK: "Pakistán",
  PW: "Palau",
  PS: "Territorio Palestino, Ocupado",
  PA: "Panamá",
  PG: "Papúa Nueva Guinea",
  PY: "Paraguay",
  PE: "Perú",
  PH: "Filipinas",
  PN: "Pitcairn",
  PL: "Polonia",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Katar",
  RE: "Reunión",
  RO: "Rumania",
  RU: "Federación Rusa",
  RW: "Ruanda",
  BL: "San Bartolomé",
  SH: "Santa elena",
  KN: "Saint Kitts y Nevis",
  LC: "Santa Lucía",
  MF: "San Martín",
  PM: "San Pedro y Miquelón",
  VC: "San Vicente y las Granadinas",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Santo Tomé y Príncipe",
  SA: "Arabia Saudita",
  SN: "Senegal",
  RS: "Serbia",
  CS: "Serbia y Montenegro",
  SC: "Seychelles",
  SL: "Sierra Leona",
  SG: "Singapur",
  SX: "San Martín",
  SK: "Eslovaquia",
  SI: "Eslovenia",
  SB: "Islas Salomón",
  SO: "Somalia",
  ZA: "Sudáfrica",
  GS: "Georgia del sur y las islas Sandwich del sur",
  SS: "Sudán del Sur",
  ES: "España",
  LK: "Sri Lanka",
  SD: "Sudán",
  SR: "Surinam",
  SJ: "Svalbard y Jan Mayen",
  SZ: "Swazilandia",
  SE: "Suecia",
  CH: "Suiza",
  SY: "República Árabe Siria",
  TW: "Taiwan, provincia de China",
  TJ: "Tayikistán",
  TZ: "Tanzania, República Unida de",
  TH: "Tailandia",
  TL: "Timor-Leste",
  TG: "Para llevar",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad y Tobago",
  TN: "Túnez",
  TR: "Turquía",
  TM: "Turkmenistán",
  TC: "Islas Turcas y Caicos",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ucrania",
  AE: "Emiratos Árabes Unidos",
  GB: "Reino Unido",
  US: "Estados Unidos",
  UM: "Islas menores alejadas de los Estados Unidos",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Vietnam",
  VG: "Islas Vírgenes Británicas",
  VI: "Islas Vírgenes, EE. UU.",
  WF: "Wallis y Futuna",
  EH: "Sahara Occidental",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabue"
};

// Creates a dropdown menu with country options and pre-selects the user's country if provided
function country_dropdown(user_country_code = "") {
  let options = "";
  $.each(countries, function (country_code, country_name) {
    options += `<option value="${country_code}"${
      country_code === user_country_code ? " selected" : ""
    }>${country_name}</option>`;
  });
  $("#mmCountry").html(options);
}

// Cache DOM elements
let suggestions = $("#suggestions");
let countryCode = "";

// Displays country suggestions based on the user's input
function show_suggestions(input) {
  suggestions.empty();
  let searchText = input.value.toLowerCase();
  let foundCountry = false;

  if (searchText.length > 0) {
    $.each(countries, function (country_code, country_name) {
      if (country_name.toLowerCase().startsWith(searchText)) {
        $("<div>")
          .text(country_name)
          .click(function () {
            input.value = country_name;
            country_dropdown(country_code);
            suggestions.empty();
          })
          .appendTo(suggestions);
        countryCode = country_code;
        foundCountry = true;
      }
    });
  }
  if (!foundCountry) {
    $("<div>").text("Sin resultados").appendTo(suggestions);
  }
}

// On input event, update the flag icon and show country suggestions
$("#country_search").on("input", function () {
  suggestions.removeClass("is--close");

  let flagCode = countryCode.toLowerCase();
  console.log($("#mmCountry").val());
  let flag = `https://hatscripts.github.io/circle-flags/flags/${flagCode}.svg`;

  $("#mmFlag").attr({ src: flag, href: flag });
  $("#mmFlagIcon").attr({ src: flag, href: flag });

  show_suggestions(this);
});

// On click event, show country suggestions and make the suggestion list visible
$("#country_search").on("click", function () {
  show_suggestions(this);
  suggestions.removeClass("is--close");
});

// On document click event, close the suggestions list if clicked outside of the input and suggestions
$(document).on("click", function (e) {
  if (
    e.target.id !== "country_search" &&
    !$(e.target).parents("#suggestions").length
  ) {
    suggestions.addClass("is--close");
  }
});

// Initialize the country dropdown menu with no pre-selected option
country_dropdown("");

// Set the input value to the selected country when the document is ready
$(document).ready(function () {
  $("#country_search").val($("#mmCountry option:selected").text());
});
