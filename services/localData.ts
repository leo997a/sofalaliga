// This file contains the data from the CSVs and the logic to parse and access it.

// --- RAW CSV DATA ---

const LOGO_CSV_DATA = `
"Link--primary","Link--primary href","Link--secondary","Link--secondary href","react-directory-commit-age"
"Athletic Bilbao.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Athletic%20Bilbao.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Atlético de Madrid.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Atl%C3%A9tico%20de%20Madrid.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"CA Osasuna.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/CA%20Osasuna.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Celta de Vigo.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Celta%20de%20Vigo.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Deportivo Alavés.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Deportivo%20Alav%C3%A9s.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Elche CF.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Elche%20CF.png","2025/26","https://github.com/luukhopman/football-logos/commit/11ff61c1cb898d263ccdf09b207fef77dff0c7d1","Jun 23, 2025"
"FC Barcelona.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/FC%20Barcelona.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Getafe CF.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Getafe%20CF.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Girona FC.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Girona%20FC.png","2025/26","https://github.com/luukhopman/football-logos/commit/11ff61c1cb898d263ccdf09b207fef77dff0c7d1","Jun 23, 2025"
"Levante UD.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Levante%20UD.png","2025/26","https://github.com/luukhopman/football-logos/commit/11ff61c1cb898d263ccdf09b207fef77dff0c7d1","Jun 23, 2025"
"RCD Espanyol Barcelona.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/RCD%20Espanyol%20Barcelona.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"RCD Mallorca.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/RCD%20Mallorca.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Rayo Vallecano.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Rayo%20Vallecano.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Real Betis Balompié.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Real%20Betis%20Balompi%C3%A9.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Real Madrid.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Real%20Madrid.png","2025/26","https://github.com/luukhopman/football-logos/commit/11ff61c1cb898d263ccdf09b207fef77dff0c7d1","Jun 23, 2025"
"Real Oviedo.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Real%20Oviedo.png","2025/26","https://github.com/luukhopman/football-logos/commit/11ff61c1cb898d263ccdf09b207fef77dff0c7d1","Jun 23, 2025"
"Real Sociedad.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Real%20Sociedad.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Sevilla FC.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Sevilla%20FC.png","2025/26","https://github.com/luukhopman/football-logos/commit/11ff61c1cb898d263ccdf09b207fef77dff0c7d1","Jun 23, 2025"
"Valencia CF.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Valencia%20CF.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
"Villarreal CF.png","https://github.com/luukhopman/football-logos/blob/master/logos/Spain%20-%20LaLiga/Villarreal%20CF.png","Restructure","https://github.com/luukhopman/football-logos/commit/324c2de253fc0f8f7d4ac9ba14d3b7fd4230add6","Sep 3, 2024"
`;

const ALAVES_PLAYERS_CSV = `"item-title","item-title href","item-title src","copies-text","card-footer","px-3","submission-preview src"
"Abde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000053956.png",...
"Aimar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000125474.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000125474.png?width=100&height=100"
"Aitor Mañas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126484.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000126484.png?width=100&height=100"
"Alberto Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000060659.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.05/2000060659.png?width=100&height=100"
"Alejandro Bueso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299691.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.02/2000299691.png?width=100&height=100"
"Ander Guevara","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67246381.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/67246381.png?width=100&height=100"
"Ander Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000274557.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000274557.png?width=100&height=100"
"Ander Varona","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000401155.png",...
"Andoni Arzak","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000132412.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.04/2000132412.png?width=100&height=100"
"Antonio Blanco","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67256515.png",...
"Antonio Sivera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67186869.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/67186869.png?width=100&height=100"
"Aratz Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000449019.png",...
"Aser Palacios","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000280048.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000280048.png?width=100&height=100"
"Borja","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000222572.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.03/2000222572.png?width=100&height=100"
"Calebe","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19363221.png",...
"Carles Aleñá","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67213011.png",...
"Carlos Ballestero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000185123.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.02/2000185123.png?width=100&height=100"
"Carlos Benavídez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78081773.png",...
"Carlos Vicente","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258842.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/67258842.png?width=100&height=100"
"Chema Aragüés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000165973.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.10/2000165973.png?width=100&height=100"
"Daniel Lyubomirov","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000296182.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000296182.png?width=100&height=100"
"Denis Suárez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67107819.png",...
"Dennis Rufo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000295465.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000295465.png?width=100&height=100"
"Diego Alcides","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214926.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.02/2000214926.png?width=100&height=100"
"Diego Morcillo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000190105.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.04/2000190105.png?width=100&height=100"
"Egoitz Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000295442.png",...
"Eneko Azarloza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448715.png",...
"Facundo Garcés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14187538.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/13.13/14187538.png?width=100&height=100"
"Flavio Ferullo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000504342.png",...
"Gaizka García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000248328.png",...
"Grégoire Swiderski","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000197887.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/2000197887.png?width=100&height=100"
"Iñaki Sáenz de Viteri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448988.png",...
"Jon Ander Barriga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448989.png",...
"Jon Guridi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67157535.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/67157535.png?width=100&height=100"
"Jon Pacheco","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67269422.png",...
"Jonny","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67144651.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/67144651.png?width=100&height=100"
"Joseda Álvarez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000145822.png",...
"Juan Barros","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000209710.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.09/2000209710.png?width=100&height=100"
"Juanmita","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000138544.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000138544.png?width=100&height=100"
"Lander Pinillos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000212248.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.00/2000212248.png?width=100&height=100"
"Lucas Boyé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14110829.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/14110829.png?width=100&height=100"
"Manex Irizar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000182746.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000182746.png?width=100&height=100"
"Mariano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67157152.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.00/67157152.png?width=100&height=100"
"Moussa Diarra","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49044569.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.05/49044569.png?width=100&height=100"
"Nahuel Tenaglia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14153906.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/14153906.png?width=100&height=100"
"Nikola Maraš","...","https://sortitoutsi.b-cdn.net/uploads/iconface/62127145.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/62127145.png?width=100&height=100"
"Pablo Goitia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000328044.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000328044.png?width=100&height=100"
"Pablo Ibañez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000033089.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.02/2000033089.png?width=100&height=100"
"Paco Sanz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000344533.png",...
"Raúl Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67018270.png",...
"Rubén Montero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000104990.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000104990.png?width=100&height=100"
"Toni Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67216151.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/67216151.png?width=100&height=100"
"Victor Parada","...","https://sortitoutsi.b-cdn.net/uploads/iconface/16282754.png",...
"Xanet Oláiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214884.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/2000214884.png?width=100&height=100"
"Yusi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000219705.png",...
`;

const ATHLETIC_CLUB_PLAYERS_CSV = `"item-title","item-title href","item-title src","copies-text","px-3","submission-preview src","card-footer"
"Adama","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000107074.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/2000107074.png?width=100&height=100",
"Adrián Lekuna","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000384535.png",...
"Adrián Pérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000280111.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000280111.png?width=100&height=100",
"Aimar Duñabeitia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000065893.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2022.14/2000065893.png?width=100&height=100",
"Aitor León","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000380190.png",...
"Aitor Paredes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276232.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.07/67276232.png?width=100&height=100",
"Alain","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489703.png",...
"Albi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489696.png",...
"Alejandro Rego","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000135696.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000135696.png?width=100&height=100",
"Álex Berenguer","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67157520.png",...
"Álex Carril","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489683.png",...
"Álex Padilla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000065884.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.15/2000065884.png?width=100&height=100",
"Ander Ezpeleta","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000503366.png",...
"Ander Izagirre","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000380185.png",...
"Ander Peciña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000384490.png",...
"Andoni Gorosabel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67202652.png",...
"Andrés Camilo Jaimes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000380189.png",...
"Aritz Conde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000330745.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.07/2000330745.png?width=100&height=100",
"Asier Hierro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217184.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000217184.png?width=100&height=100",
"Asier Torres","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000457487.png",...
"Aymeric Laporte","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85085378.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.10/85085378.png?width=100&height=100",
"Beñat García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000287935.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000287935.png?width=100&height=100",
"Beñat Larrea","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000384488.png",...
"Beñat Prados","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277835.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.04/67277835.png?width=100&height=100",
"Christian Imga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000503369.png",...
"Danel Belategi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000287757.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000287757.png?width=100&height=100",
"Dani Pérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000296996.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000296996.png?width=100&height=100",
"Dani Vivian","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67256618.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.10/67256618.png?width=100&height=100",
"David Arredondo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217267.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000217267.png?width=100&height=100",
"David Osipov","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217259.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000217259.png?width=100&height=100",
"Diego Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000482451.png",...
"Eder García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000141541.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.06/2000141541.png?width=100&height=100",
"Eghosa Nomayo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000275413.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.03/2000275413.png?width=100&height=100",
"Egoitz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000467244.png",...
"Elijah Gift","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000191847.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.00/2000191847.png?width=100&height=100",
"Eñaut Lete","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000141496.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/2000141496.png?width=100&height=100",
"Endika Buján","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000296241.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/2000296241.png?width=100&height=100",
"Eneko Ebro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000119302.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2022.14/2000119302.png?width=100&height=100",
"Eneko Ellakuria","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000287681.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000287681.png?width=100&height=100",
"Eric Gamen","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000280046.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000280046.png?width=100&height=100",
"Gaizka Albóniga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000150851.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.15/2000150851.png?width=100&height=100",
"Gorka Guruzeta","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67200930.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/67200930.png?width=100&height=100",
"Gorka Jaio","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000442010.png",...
"Ibai Sanz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000065900.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.12/2000065900.png?width=100&height=100",
"Ibon Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000182741.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000182741.png?width=100&height=100",
"Igor Oyono","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000370918.png",...
"Iker Galindo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000298526.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.00/2000298526.png?width=100&height=100",
"Iker Pagaza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000280045.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000280045.png?width=100&height=100",
"Iker Quintero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000370997.png",...
"Ilyas El Arbaoui","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000503365.png",...
"Iñaki Williams","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67184349.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/67184349.png?width=100&height=100",
"Íñigo Lekue","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67184347.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/67184347.png?width=100&height=100",
"Íñigo Ruiz de Galarreta","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67088157.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.00/67088157.png?width=100&height=100",
"Íñigo Sainz de Leciñana","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000371000.png",...
"Javi Sola","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000275409.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.02/2000275409.png?width=100&height=100",
"Jesús Areso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67256097.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.02/67256097.png?width=100&height=100",
"Johaneko Louis-Jean","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000096637.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000096637.png?width=100&height=100",
"Jon De Luis","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000121909.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.01/2000121909.png?width=100&height=100",
"Manex Gibelalde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000141532.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2025.00/2000141532.png?width=100&height=100",
"Manex Lozano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489705.png",...
"Marcos Goñi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000403790.png",...
"Maroan Sannadi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000212020.png",...
"Miguel Barandalla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000134114.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.14/2000134114.png?width=100&height=100",
"Mikel Jauregizar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000134186.png",...
"Mikel Santos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217252.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.15/2000217252.png?width=100&height=100",
"Mikel Vesga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67195855.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.11/67195855.png?width=100&height=100",
"Nico Serrano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295206.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/67295206.png?width=100&height=100",
"Nico Williams","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276230.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.10/67276230.png?width=100&height=100",
"Oier Unamuno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489673.png",...
"Oihan Sancet","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67260204.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/67260204.png?width=100&height=100",
"Pablo Iturria","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489689.png",...
"Pablo Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000394743.png",...
"Peio Córdoba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000380269.png",...
"Peio Huestamendia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217190.png",...
"Robert Navarro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49052213.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/49052213.png?width=100&height=100",
"Rubén Esparza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000503364.png",...
"Selton","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000403784.png",...
"Simón García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000394746.png",...
"Telmo Zarandona","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489677.png",...
"Txus Vizcay","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217186.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.01/2000217186.png?width=100&height=100",
"Unai Eguíluz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000066197.png",...
"Unai Gómez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000065899.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.00/2000065899.png?width=100&height=100",
"Unai Simón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67200923.png",...
"Unax","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000489700.png",...
"Urko Izeta","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67256679.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.13/67256679.png?width=100&height=100",
"Xabi Irurita","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000024294.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.11/2000024294.png?width=100&height=100",
"Xantiago Oyharçabal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000503368.png",...
"Yeray","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67192475.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2023.11/67192475.png?width=100&height=100",
"Yuri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67035000.png",,,"https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/2024.06/67035000.png?width=100&height=100",
`;

const ATLETICO_MADRID_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adrián Corral","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000057468.png"
"Aleksa Puric","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000086286.png"
"Álex Baena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67287665.png"
"Alexander Sørloth","...","https://sortitoutsi.b-cdn.net/uploads/iconface/53063430.png"
"Álvaro Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000396082.png"
"Álvaro Tamargo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300229.png"
"Antoine Griezmann","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67086656.png"
"Arnau Ortiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000130406.png"
"Bogdan Ungureanu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000362347.png"
"Carlos Giménez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000145427.png"
"Carlos Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000130577.png"
"Clément Lenglet","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85078880.png"
"Conor Gallagher","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28108036.png"
"Dani Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000213929.png"
"Dani Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000425089.png"
"Daniel Fitzgerald","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000485059.png"
"Darío","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300222.png"
"David Arza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000485207.png"
"David Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000457929.png"
"Dávid Hancko","...","https://sortitoutsi.b-cdn.net/uploads/iconface/63029353.png"
"David Meza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000390814.png"
"Gerónimo Spina","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000241167.png"
"Giacomo Raspadori","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43316850.png"
"Giuliano Simeone","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14250859.png"
"Gonzalo Gross","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000485197.png"
"Iker Luque","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300220.png"
"Ilias Kostis","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000049483.png"
"Izan Coulibaly","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000284162.png"
"Jan Colomé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448402.png"
"Jan Oblak","...","https://sortitoutsi.b-cdn.net/uploads/iconface/64016316.png"
"Jano Monserrate","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000295441.png"
"Javi Alonso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300235.png"
"Javi Díaz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300224.png"
"Javi Galán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67243881.png"
"Javi Serrano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000057465.png"
"Javi Tena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000385014.png"
"Javier Aznar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000395725.png"
"Javier Boñar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000130568.png"
"Jesús Barrios","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000404955.png"
"Johnny Cardoso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/89066513.png"
"Jorge Castellanos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300238.png"
"Jorge Rajado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000396085.png"
"José Giménez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78060464.png"
"Juan Alegre","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448403.png"
"Juan Musso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14048328.png"
"Julián Álvarez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14183207.png"
"Julio Díaz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000213969.png"
"Koke","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67047092.png"
"Luismi Morales","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448395.png"
"Marc Pubill","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000101248.png"
"Marcos Llorente","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67196198.png"
"Mariano Villafáfila","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000407038.png"
"Mario De Luis","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000050743.png"
"Matteo Ruggeri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43425834.png"
"Miguel Cubo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000485210.png"
"Nahuel Molina","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14129337.png"
"Nicolás González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14181375.png"
"Omar Janneh","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300244.png"
"Óscar Bazaga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000396081.png"
"Pablo Barrios","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000125958.png"
"Pablo Pan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000448375.png"
"Rayane Belaid","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000379469.png"
"Robin Le Normand","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48037162.png"
"Salvi Esquivel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000213587.png"
"Sergio Vinatea","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000294486.png"
"Servahterio Steffens","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000485714.png"
"Taufik Seidu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000379470.png"
"Thiago Almada","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14172522.png"
`;
const BARCELONA_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adrian Gill","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000228098.png"
"Alejandro Balde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67296654.png"
"Alexis Olmedo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297397.png"
"Álvaro Cortés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214885.png"
"Andreas Christensen","...","https://sortitoutsi.b-cdn.net/uploads/iconface/27066387.png"
"Andrés Cuenca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297335.png"
"Brian Fariñas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297428.png"
"Dani Ávila","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297433.png"
"Dani Olmo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/24048100.png"
"Dani Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000160572.png"
"David Oduro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000205750.png"
"Diego Kochen","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000228176.png"
"Dro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000402688.png"
"Eder Aller","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000298440.png"
"Eldar Tagizad?","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000038618.png"
"Emilio Bernad","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67246345.png"
"Eric García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28116427.png"
"Fermín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000141742.png"
"Ferran Torres","...","https://sortitoutsi.b-cdn.net/uploads/iconface/89056845.png"
"Frenkie de Jong","...","https://sortitoutsi.b-cdn.net/uploads/iconface/37047745.png"
"Gavi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000049413.png"
"Gerard Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000101061.png"
"Guillem Víctor","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297346.png"
"Ibrahim Diarra","...","https://sortitoutsi.b-cdn.net/uploads/iconface/12095249.png"
"Joan Anaya","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000224995.png"
"Joan García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277675.png"
"Jofre Torrents","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297306.png"
"Juan Hernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297543.png"
"Jules Koundé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48036304.png"
"Lamine Yamal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000256231.png"
"Landry Farré","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297311.png"
"Leo Saca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297412.png"
"Lovro Chelfi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000273448.png"
"Mamadou Mbacke","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000112210.png"
"Marc Bernal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000295603.png"
"Marc Casadó","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000058198.png"
"Marc-André ter Stegen","...","https://sortitoutsi.b-cdn.net/uploads/iconface/35017428.png"
"Marcus Rashford","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28100266.png"
"Michal Zuk","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000466853.png"
"Óscar Ureña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000119910.png"
"Pau Cubarsí","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000296497.png"
"Pedri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67293495.png"
"Quim Junyent","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297440.png"
"Raphinha","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19242277.png"
"Robert Lewandowski","...","https://sortitoutsi.b-cdn.net/uploads/iconface/719601.png"
"Roberto Tomás","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000466871.png"
"Roger Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000049429.png"
"Ronald Araujo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78085068.png"
"Roony Bardghji","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000088490.png"
"Shane Kluivert","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297774.png"
"Tomàs Marqués","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297470.png"
"Toni Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000351880.png"
"Víctor Barberà","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000134239.png"
"Wojciech Szczesny","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28009478.png"
"Xavi Espart","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000298787.png"
`;
const BETIS_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adrián","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67006173.png"
"Adrián Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000238350.png"
"Aitor Gismera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000125964.png"
"Aitor Ruibal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67220941.png"
"Álvaro Valles","...","https://sortitoutsi.b-cdn.net/uploads/iconface/89051923.png"
"Ángel Ortiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000137137.png"
"Antony","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19338230.png"
"Bili","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000328858.png"
"Borja Alonso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217593.png"
"Cédric Bakambu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/34009930.png"
"Chuli","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214607.png"
"Cucho Hernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/76043783.png"
"Dani Pérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161668.png"
"Darling Bladi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000025589.png"
"Destiny Ilahude","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000056421.png"
"Diego Llorente","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67011217.png"
"Elyaz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000220037.png"
"Ez Abde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000054872.png"
"Ezequiel Ávila","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14027117.png"
"Fèlix Garreta","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161665.png"
"Germán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000210774.png"
"Ginés Sorroche","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000137475.png"
"Giovani Lo Celso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14108651.png"
"Héctor Bellerín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28066082.png"
"Ian Forns","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000117935.png"
"Isco","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67103537.png"
"Iván Corralejo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000335218.png"
"Jhon Arcila","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000246075.png"
"Jorge Oreiro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223117.png"
"Juanito González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000334456.png"
"Junior","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000163363.png"
"Júnior Firpo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67222900.png"
"Marc Bartra","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67063004.png"
"Marc Roca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67211094.png"
"Marcos Solís","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161666.png"
"Mawuli Mensah","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000165868.png"
"Miguel Cuevas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000335242.png"
"Mohamed Hamdoune","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000241029.png"
"Natan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19351985.png"
"Nelson Deossa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000078824.png"
"Pablo Busto","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000210763.png"
"Pablo Fornals","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67214613.png"
"Pablo García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000210786.png"
"Pau López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67178152.png"
"Ricardo Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/98003635.png"
"Rodrigo Marina","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000210790.png"
"Rodrigo Riquelme","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67259880.png"
"Sergi Altimira","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000116169.png"
"Sofyan Amrabat","...","https://sortitoutsi.b-cdn.net/uploads/iconface/37045879.png"
"Valentín Gómez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000077331.png"
"Yanis Senhadji","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000238351.png"
`;
const CELTA_VIGO_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adrià Capdevila","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161848.png"
"Ángel Arcos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000332661.png"
"Borja Iglesias","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67173048.png"
"Bryan Zaragoza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000054263.png"
"Caio Barone","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000238467.png"
"Carl Starfelt","...","https://sortitoutsi.b-cdn.net/uploads/iconface/93055760.png"
"Carlos Domínguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67279603.png"
"Coke Carrillo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000048835.png"
"Damián","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000052483.png"
"David De La Iglesia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000124139.png"
"Ferran Jutglà","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67272136.png"
"Fran Beltrán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67232115.png"
"Franco Cervi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14078688.png"
"Hugo Álvarez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000052525.png"
"Hugo Burcio","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000332663.png"
"Hugo González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295025.png"
"Hugo Sotelo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000052526.png"
"Iago Aspas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67010455.png"
"Ianis Târba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000215527.png"
"Ilaix Moriba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67279753.png"
"Ionut Radu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43134973.png"
"Iván Villar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67191440.png"
"Jan Oliveras","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000034879.png"
"Javi Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000124157.png"
"Javi Rueda","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000051368.png"
"Joel López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28122038.png"
"Jones El-Abdellaoui","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000174402.png"
"Joseph Aidoo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/13158416.png"
"Kike Ribes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000131779.png"
"Luis Bilbao","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000065901.png"
"Manu Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67293677.png"
"Marc Vidal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/89062862.png"
"Marcos Alonso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67080310.png"
"Marcos González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000332644.png"
"Miguel Román","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000022151.png"
"Mihailo Ristic","...","https://sortitoutsi.b-cdn.net/uploads/iconface/62137429.png"
"Óscar Marcos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300098.png"
"Óscar Mingueza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67245413.png"
"Pablo Durán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000106795.png"
"Pablo Gavián","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000332656.png"
"Pablo Meixús","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000124150.png"
"Ratón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000295458.png"
"Sergio Carreira","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67263766.png"
"Seyni N'Diaye","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000319518.png"
"Vicente Nunes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000197077.png"
"Williot Swedberg","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000008568.png"
"Yoel Lago","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000124150.png"
`;
const ELCHE_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adam Boayar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000221092.png"
"Adrià Pedrosa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/95035991.png"
"Aleix Febas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67179156.png"
"Alejandro Iturbe","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000049485.png"
"Ali Houary","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000221091.png"
"Álvaro Núñez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276231.png"
"Álvaro Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000218258.png"
"André Silva","...","https://sortitoutsi.b-cdn.net/uploads/iconface/55041694.png"
"Bambo Diaby","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43318440.png"
"Bema Sina","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000246243.png"
"Carlos Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301770.png"
"David Affengruber","...","https://sortitoutsi.b-cdn.net/uploads/iconface/16202375.png"
"Federico Redondo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14253394.png"
"Germán Valera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67278144.png"
"Grady Diangana","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28101028.png"
"Guido Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000054871.png"
"Héctor Fort","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000227977.png"
"Iñaki Peña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67221484.png"
"John Chetauya","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295648.png"
"Josan Ferrández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67093858.png"
"Léo Pétrot","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48043564.png"
"Marc Aguado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258846.png"
"Martim Neto","...","https://sortitoutsi.b-cdn.net/uploads/iconface/83261901.png"
"Mateo Sciancalepore","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299745.png"
"Matías Dituro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/77016093.png"
"Nordin","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000221098.png"
"Pablo Felipe","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000219248.png"
"Pedro Bigas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67122014.png"
"Piri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126453.png"
"Rafa Mir","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67221051.png"
"Rodrigo Mendoza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126534.png"
"Víctor Chust","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258572.png"
"Yago Santiago","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28129860.png"
`;
const ESPANYOL_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adama Timera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000294882.png"
"Aimar Vicandi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000119309.png"
"Àlex Almansa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161865.png"
"Álex Ruiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000047818.png"
"Ángel Fortuño","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295931.png"
"Angelo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000303608.png"
"Antoniu Roca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126360.png"
"Carlos Romero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000019413.png"
"Carlos Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000309579.png"
"Charles Pickel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/98033713.png"
"Christ Letono","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000205027.png"
"Clemens Riedel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000069175.png"
"Edu Expósito","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67224139.png"
"Fernando Calero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67211739.png"
"Fran García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000311484.png"
"Izan Sarmiento","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217580.png"
"Jan Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000302925.png"
"Javi Hernàndez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214133.png"
"Javi Puado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67222737.png"
"Jofre Carreras","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277677.png"
"José Ángel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000303555.png"
"José Luís Català","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000116128.png"
"José Salinas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67289962.png"
"Kike García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67065538.png"
"Leandro Cabrera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78027200.png"
"Llorenç Serred","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000309578.png"
"Lluc Castell","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299750.png"
"Luca Koleosho","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000061312.png"
"Marcos Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000200860.png"
"Marko Dmitrovic","...","https://sortitoutsi.b-cdn.net/uploads/iconface/62038612.png"
"Miguel Rubio","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67282688.png"
"Omar El Hilali","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000049425.png"
"Pere Milla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67170824.png"
"Pol Lozano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67246431.png"
"Pol Rivera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000277289.png"
"Pol Tristán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277653.png"
"Ramón Terrats","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000063225.png"
"Roberto Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000101543.png"
"Roger Farrerons","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000312026.png"
"Rubén Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000049422.png"
"Sander Ballero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000274880.png"
"Thymos Caroutas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000101057.png"
"Tyrhys Dolan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/29218322.png"
"Urko González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000058330.png"
"Xavi Pleguezuelo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000053062.png"
"Xavi Rufo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299759.png"
`;
const GETAFE_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Abdelkabir Abqar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67257704.png"
"Abu Kamara","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28127271.png"
"Adrián Liso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000271899.png"
"Adrián Riquelme","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000213995.png"
"Álex Sancris","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67231126.png"
"Allan Nyom","...","https://sortitoutsi.b-cdn.net/uploads/iconface/34009070.png"
"Borja Mayoral","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67211912.png"
"Bouba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000213023.png"
"Carlos León","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000137135.png"
"Coba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000193127.png"
"Damián Cáceres","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000076418.png"
"David Soria","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67011248.png"
"Davinchi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000369658.png"
"Diego Rico","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67149986.png"
"Djéné Dakonam","...","https://sortitoutsi.b-cdn.net/uploads/iconface/211232.png"
"Domingos Duarte","...","https://sortitoutsi.b-cdn.net/uploads/iconface/55063355.png"
"Gorka Rivera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000210546.png"
"Hugo Solozábal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000278922.png"
"Ismael Bekhoucha","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000281951.png"
"Javi Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67199309.png"
"Jirí Letácek","...","https://sortitoutsi.b-cdn.net/uploads/iconface/25058195.png"
"Jorge Benito","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000302166.png"
"Jorge Montes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000087588.png"
"José Antonio Arjona","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000246688.png"
"Joselu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000325321.png"
"Juan Iglesias","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67235978.png"
"Juanmi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67106568.png"
"Kiko Femenía","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67063051.png"
"Lucas Laso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000013405.png"
"Luis Milla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67191561.png"
"Marc Vilaplana","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000125688.png"
"Mario Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000163504.png"
"Mauro Arambarri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78064881.png"
"Mykyta Aleksandrov","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000050942.png"
"Rubi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000241493.png"
"Sidi Eddey","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000334040.png"
"Yassin Tallal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000386620.png"
"Yvan Neyou","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85134218.png"
`;
const GIRONA_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Abel Ruiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67245418.png"
"Adrián Miranda","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000138100.png"
"Alejandro Francés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67281886.png"
"Álex Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67153373.png"
"Antonio Salguero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000335213.png"
"Arnau Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000062512.png"
"Axel Witsel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/8169215.png"
"Azzedine Ounahi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49052370.png"
"Biel Farrés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000276485.png"
"Bryan Gil","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67260440.png"
"Carles Garrido","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301868.png"
"Cristhian Stuani","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78000806.png"
"Daley Blind","...","https://sortitoutsi.b-cdn.net/uploads/iconface/37005632.png"
"David López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67155094.png"
"Dominik Livakovic","...","https://sortitoutsi.b-cdn.net/uploads/iconface/24025298.png"
"Donny van de Beek","...","https://sortitoutsi.b-cdn.net/uploads/iconface/37048153.png"
"Ferran Ruiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126412.png"
"Hugo Rincón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000065892.png"
"Iván Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258832.png"
"Jhon Solís","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000040214.png"
"Joel Roca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000164598.png"
"Juan Arango","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000112744.png"
"Juan Carlos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67039108.png"
"Lass Kourouma","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000227523.png"
"Miguel Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126441.png"
"Mohammed Hamony","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297062.png"
"Nil Calderó","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297514.png"
"Paulo Gazzaniga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67136579.png"
"Pol Arnau","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000293993.png"
"Portu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67115581.png"
"Ricard Artero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000165475.png"
"Sergi Puig","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67247577.png"
"Shinnosuke Katsushima","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000164290.png"
"Thomas Lemar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85093001.png"
"Viktor Tsygankov","...","https://sortitoutsi.b-cdn.net/uploads/iconface/71080414.png"
"Vitor Reis","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000221609.png"
"Vladyslav Krapyvtsov","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000210771.png"
"Vladyslav Vanat","...","https://sortitoutsi.b-cdn.net/uploads/iconface/71113671.png"
"Yaser Asprilla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000053239.png"
`;
const LEVANTE_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adrián De la Fuente","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258573.png"
"Alan Matturro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000009463.png"
"Alejandro Herranz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000302165.png"
"Álex Primo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000147031.png"
"Bachuri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000303409.png"
"Borja Cortina","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300093.png"
"Carlos Álvarez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67291985.png"
"Carlos Espí","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299722.png"
"Carlos Peñarada","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301763.png"
"Dani Cervera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161854.png"
"Diego Pampín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67247255.png"
"Dylan Iglesias","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000277060.png"
"Goduine Koyalipou","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49037548.png"
"Iker Losada","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67278254.png"
"Iván Romero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295596.png"
"Jeremy Toljan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/92029806.png"
"Jon Ander Olasagasti","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67262370.png"
"Jorge Cabello","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301558.png"
"José Luis Morales","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67030120.png"
"Kareem Tunde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161876.png"
"Karl Etta Eyong","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000190386.png"
"Kervin Arriaga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/87040726.png"
"Manu Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67284340.png"
"Mario Sesè","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000132169.png"
"Mathew Ryan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/15016604.png"
"Matías Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000158335.png"
"Oriol Rey","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67245415.png"
"Pablo Campos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000062888.png"
"Pablo Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67257916.png"
"Roger Brugué","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67269465.png"
"Unai Elgezabal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67186192.png"
"Unai Vencedor","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67260207.png"
"Víctor García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67270544.png"
`;
const MALLORCA_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Abdón Prats","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67142194.png"
"Adrián Barquero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000292235.png"
"Aimar Peña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000134130.png"
"Antonio Raíllo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67148381.png"
"Antonio Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67272744.png"
"Dani Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/1509441.png"
"David López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000197963.png"
"Iliesse Salhi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000290833.png"
"Iván Cuéllar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/7451366.png"
"Jan Virgili","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000402904.png"
"Javi Llabrés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000197966.png"
"Johan Mojica","...","https://sortitoutsi.b-cdn.net/uploads/iconface/76020280.png"
"Leo Román","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000028428.png"
"Lucas Bergström","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28124568.png"
"Manu Morlanes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67228802.png"
"Marash Kumbulla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43296495.png"
"Marc López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217608.png"
"Marcos Gorriti","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000101058.png"
"Martin Valjent","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43143925.png"
"Mateo Joseph","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000108513.png"
"Mateu Morey","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258408.png"
"Miquel Jaume","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000054737.png"
"Nil Torreguitart","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297303.png"
"Omar Mascarell","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67153634.png"
"Pablo Maffeo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28095341.png"
"Pablo Torre","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000040347.png"
"Pere Amer","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000273051.png"
"Saifdine Chlaghmo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000337094.png"
"Samú","...","https://sortitoutsi.b-cdn.net/uploads/iconface/83206392.png"
"Sergi Darder","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67118372.png"
"Takuma Asano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/45078327.png"
"Toni Lato","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67203459.png"
"Vedat Muriqi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/11022221.png"
`;
const OSASUNA_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Abel Bretones","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67288450.png"
"Aimar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276375.png"
"Aitor Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67054783.png"
"Alejandro Catena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67210735.png"
"Ander Yoldi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000033092.png"
"Ante Budimir","...","https://sortitoutsi.b-cdn.net/uploads/iconface/24003746.png"
"Anton Yefremov","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000082968.png"
"Asier Osambela","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000194136.png"
"Carlos Lumbreras","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000230858.png"
"Dani González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295238.png"
"Diego Espejo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67279509.png"
"Dimitris Stamatakis","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000130792.png"
"Flavien-Enzo Boyomo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/29219115.png"
"Iker Benito","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67288316.png"
"Iker Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67288317.png"
"Javi Sola","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000298884.png"
"Jon","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000230855.png"
"Jon García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000182484.png"
"Jon Moncayola","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67267210.png"
"Jorge Herrando","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67267209.png"
"Juan Cruz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43077014.png"
"Julen Vicuña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000230857.png"
"Kike Barja","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67196202.png"
"Lucas Torró","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67158501.png"
"Martín Pedroarena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000281953.png"
"Mauro Echegoyen","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000230859.png"
"Miguel Auria","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000306027.png"
"Mikel Ansó","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000247966.png"
"Mikel García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000111577.png"
"Moi Gómez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67142544.png"
"Raúl Chasco","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000125162.png"
"Raúl García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67257319.png"
"Roberto Arroyo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000132511.png"
"Rubén García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67155012.png"
"Sergio Herrera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67181753.png"
"Sheraldo Becker","...","https://sortitoutsi.b-cdn.net/uploads/iconface/37027194.png"
"Unai Santos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000230862.png"
"Valentin Rosier","...","https://sortitoutsi.b-cdn.net/uploads/iconface/50047466.png"
"Víctor Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126470.png"
"Xabi Garín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000308046.png"
`;
const OVIEDO_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Aarón Escandell","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67192427.png"
"Abdel Rahim Alhassane","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000131530.png"
"Adri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000233313.png"
"Adrián Lopes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000291554.png"
"Alberto Reina","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67245796.png"
"Álex Forés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295651.png"
"Álvaro Lemos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67118135.png"
"Brandon Domingues","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49037466.png"
"Castri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67294959.png"
"Dani Calvo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67218464.png"
"David Carmo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/83111598.png"
"David Costas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67191439.png"
"Diego Espinosa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000246509.png"
"Diego Tejón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000082508.png"
"Dieguito","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000291551.png"
"Éric Bailly","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67191910.png"
"Federico Viñas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78093405.png"
"Haissem Hassan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49053388.png"
"Horatiu Moldovan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/57150378.png"
"Ilyas Chaira","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000062514.png"
"Jaime Coballes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000254277.png"
"Javi López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67293674.png"
"Joaquín Delgado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000112598.png"
"Josip Brekalo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/24046837.png"
"Kwasi Sibo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/59130428.png"
"Leander Dendoncker","...","https://sortitoutsi.b-cdn.net/uploads/iconface/18057380.png"
"Lucas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67199396.png"
"Lucas Antañón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000124115.png"
"Luka Ilic","...","https://sortitoutsi.b-cdn.net/uploads/iconface/62164327.png"
"Marco Esteban","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000247950.png"
"Marcos Lopes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000291558.png"
"Mate Sauri","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000308458.png"
"Miguel Narváez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000230120.png"
"Mouhamed Lamine","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000242044.png"
"Nacho Vidal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67184889.png"
"Oier Luengo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258680.png"
"Omar Falah","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000243024.png"
"Óscar De La Hera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299245.png"
"Ovie Ejaria","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28101722.png"
"Pelayo García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217729.png"
"Salomón Rondón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67063933.png"
"Santi Cazorla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/7456688.png"
"Santiago Colombatto","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14110838.png"
`;
const RAYO_VALLECANO_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Abdul Mumin","...","https://sortitoutsi.b-cdn.net/uploads/iconface/27128916.png"
"Alemão","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19333258.png"
"Alfonso Espino","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78066692.png"
"Álvaro García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67184140.png"
"Andrei Ratiu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67217491.png"
"Augusto Batalla","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14059327.png"
"Bala","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000124758.png"
"Beto Plaza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000394192.png"
"Dani Cárdenas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67225564.png"
"Diego Méndez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000209781.png"
"Florian Lejeune","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85063747.png"
"Fran Pérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/95078306.png"
"Gerard Gumbau","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67207185.png"
"Glenn Jorge de Bruyn","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000144052.png"
"Ibrahima Camara","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000060706.png"
"Isi Palazón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67173045.png"
"Iván Balliu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67053461.png"
"Jack Stenström","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000251826.png"
"Javi Baldobar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000277424.png"
"Jorge De Frutos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67231100.png"
"Jozhua Vertrouwd","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000144900.png"
"Juanpe","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67293610.png"
"Luiz Felipe","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19225765.png"
"Nobel Mendy","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000138305.png"
"Óscar Trejo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/958318.png"
"Óscar Valentín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67213714.png"
"Pathé Ciss","...","https://sortitoutsi.b-cdn.net/uploads/iconface/13181623.png"
"Pedro Díaz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67220203.png"
"Pep Chavarría","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277695.png"
"Randy Nteka","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277397.png"
"Raul' Allahverdiev","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000227641.png"
"Samu Becerra","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000324215.png"
"Sergio Camello","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67272502.png"
"Sergio Lozano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000324216.png"
"Unai López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67145056.png"
`;
const REAL_MADRID_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Aimar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223324.png"
"Álex Pérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000248044.png"
"Álex Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223338.png"
"Alfredo Sotres","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000212053.png"
"Álvaro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000296991.png"
"Álvaro Carreras","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000032706.png"
"Álvaro Ginés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214896.png"
"Álvaro Leiva","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000132483.png"
"Andriy Lunin","...","https://sortitoutsi.b-cdn.net/uploads/iconface/71099053.png"
"Antonio Rüdiger","...","https://sortitoutsi.b-cdn.net/uploads/iconface/92023410.png"
"Arda Güler","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000077193.png"
"Ariel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000305094.png"
"Aurélien Tchouaméni","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48042326.png"
"Benjamín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299832.png"
"Brahim Díaz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28106999.png"
"Bruno Galassi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000310956.png"
"Bruno Iglesias","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000052096.png"
"Carlos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000310925.png"
"César Palacios","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217846.png"
"Cristian David","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000219673.png"
"Dani Carvajal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67139735.png"
"Dani Ceballos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67202350.png"
"Daniel Yáñez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299363.png"
"David Alaba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/16010162.png"
"David Jiménez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000211948.png"
"Dean Huijsen","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000109240.png"
"Diego Aguado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299717.png"
"Diego Arroyo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000222552.png"
"Éder Militão","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19273276.png"
"Eduardo Camavinga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49056243.png"
"Endrick","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000220941.png"
"Eric Gómez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217596.png"
"Federico Valverde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/78074594.png"
"Ferland Mendy","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85133751.png"
"Ferrán Quetglás","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000164458.png"
"Ferran Seco","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299720.png"
"Fran García","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67245235.png"
"Fran González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000218419.png"
"Franco Mastantuono","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000183231.png"
"Gabriel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000310928.png"
"Gonzalo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000143029.png"
"Guillermo Súnico","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000211944.png"
"Hugo de Llanos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000222381.png"
"Hugo Mantecón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000218276.png"
"Iker Gil","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000163757.png"
"Illia Voloshyn","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000332815.png"
"Izan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223330.png"
"Jacobo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000220036.png"
"Jaime Calleja","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126398.png"
"Javi Navarro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299380.png"
"Javier Mena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000305003.png"
"Jesús Fortea","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000293312.png"
"Joan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299435.png"
"Joan Mascaró","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000220094.png"
"Jorge Cestero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223283.png"
"Jude Bellingham","...","https://sortitoutsi.b-cdn.net/uploads/iconface/29232937.png"
"Kike Herrero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000111335.png"
"Kylian Mbappé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85139014.png"
"Loren Zúñiga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000055376.png"
"Manu Serrano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000211978.png"
"Manuel Ángel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000146335.png"
"Mario Rivas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299823.png"
"Óscar Mesa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223272.png"
"Paulo Almeida","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000304952.png"
"Pol Durán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299373.png"
"Pol Fortuny","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214902.png"
"Rachad Fettal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300102.png"
"Raúl Asencio","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126407.png"
"Roberto","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000223330.png"
"Rodrygo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19306929.png"
"Sergio Mestre","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000164447.png"
"Thiago","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000310973.png"
"Thibaut Courtois","...","https://sortitoutsi.b-cdn.net/uploads/iconface/18026122.png"
"Trent Alexander-Arnold","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28104124.png"
"Valde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000297000.png"
"Vinícius Júnior","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19302146.png"
"Yeray","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000163793.png"
`;
const REAL_SOCIEDAD_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Aihen Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67246383.png"
"Aitor Fraga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67292825.png"
"Alberto Dadie","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276476.png"
"Álex Lebarbier","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000141556.png"
"Álex Remiro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67183918.png"
"Álvaro Odriozola","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67199408.png"
"Ander Barrenetxea","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276482.png"
"Aritz Elustondo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67190072.png"
"Arkaitz Mariezkurrena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214907.png"
"Arsen Zakharyan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000014077.png"
"Beñat Turrientes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276474.png"
"Brais Méndez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67199158.png"
"Carlos Soler","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67196204.png"
"Darío Ramírez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000310495.png"
"Duje Caleta-Car","...","https://sortitoutsi.b-cdn.net/uploads/iconface/24039427.png"
"Egoitz Arana","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276473.png"
"Ekain Orobengoa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126325.png"
"Eneko Astigarraga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000219979.png"
"Gonçalo Guedes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/55041710.png"
"Igor Zubeldia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67215898.png"
"Iñaki Rupérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67288319.png"
"Jakes Gorosabel","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000245593.png"
"Job Ochieng","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000258074.png"
"Jon Aramburu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/86080170.png"
"Jon Balda","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000131404.png"
"Jon Eceizabarrena","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000312515.png"
"Jon Garro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000312508.png"
"Jon Gorrotxategi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000131424.png"
"Jon Karrikaburu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000082463.png"
"Jon Martín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000229718.png"
"Lander Olasagasti","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000310447.png"
"Luka Sucic","...","https://sortitoutsi.b-cdn.net/uploads/iconface/16254093.png"
"Luken Beitia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000141451.png"
"Markel Peral","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301799.png"
"Mikel Goti","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295208.png"
"Mikel Oyarzábal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67220143.png"
"Mikel Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000219415.png"
"Orri Óskarsson","...","https://sortitoutsi.b-cdn.net/uploads/iconface/39062838.png"
"Pablo Marín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000131318.png"
"Peru Rodríguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67276475.png"
"Santino Samuyiwa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000169938.png"
"Sergio Gómez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67258414.png"
"Sydney Osazuwa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000335245.png"
"Takefusa Kubo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/45104608.png"
"Umar Sadiq","...","https://sortitoutsi.b-cdn.net/uploads/iconface/43195181.png"
"Unai Marrero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67269425.png"
"Unax Agote","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126082.png"
"Yangel Herrera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/86047272.png"
"Zac Shuaib","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301023.png"
`;
const SEVILLA_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Abdellah Raihani","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000125954.png"
"Adnan Januzaj","...","https://sortitoutsi.b-cdn.net/uploads/iconface/18054092.png"
"Akor Adams","...","https://sortitoutsi.b-cdn.net/uploads/iconface/53167062.png"
"Alberto Collado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214603.png"
"Alberto Espiñeira","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300124.png"
"Alberto Flores","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000094510.png"
"Álex Costa","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000206473.png"
"Alexis Sánchez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/75000261.png"
"Alfon","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67255218.png"
"Álvaro Fernández","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67246951.png"
"Andrés Castrín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000052955.png"
"Bakary Sow","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214613.png"
"Batista Mendy","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48043868.png"
"César Azpilicueta","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67033300.png"
"Chidera Ejuke","...","https://sortitoutsi.b-cdn.net/uploads/iconface/13182752.png"
"Dani Gil","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300120.png"
"Dima","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000218298.png"
"Djibril Sow","...","https://sortitoutsi.b-cdn.net/uploads/iconface/98034373.png"
"Edu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000264703.png"
"Edu Altozano","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300127.png"
"Fábio Cardoso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/55024859.png"
"Gabriel Suazo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/75037990.png"
"Ibra Sow","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300128.png"
"Iker Muñoz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214595.png"
"Iker Villar","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000211220.png"
"Isaac Romero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295600.png"
"Israel Domínguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000122849.png"
"Jesús Acuña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299785.png"
"Joan Jordán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67187249.png"
"Jorge Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299781.png"
"José Ángel Carmona","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000053930.png"
"Juanca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000159077.png"
"Juanlu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000027530.png"
"Kike Salas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000165617.png"
"Lorenzo Luchino","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300122.png"
"Lucien Agoumé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49048461.png"
"Lulo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000054897.png"
"Manu Bueno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000187407.png"
"Marcão","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19190440.png"
"Nemanja Gudelj","...","https://sortitoutsi.b-cdn.net/uploads/iconface/62013805.png"
"Odysseas Vlachodimos","...","https://sortitoutsi.b-cdn.net/uploads/iconface/92017506.png"
"Ørjan Nyland","...","https://sortitoutsi.b-cdn.net/uploads/iconface/53004955.png"
"Oso","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000157265.png"
"Pablo Rivera","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214604.png"
"Peque","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295757.png"
"Rafa Romero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000212642.png"
"Ramón","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000076898.png"
"Razvan Jalade","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000293996.png"
"Rubén Vargas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/98041215.png"
"Sergio Veces","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214592.png"
"Tanguy Nianzou","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49048365.png"
`;
const VALENCIA_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Aimar Blázquez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000325320.png"
"Alejandro Panach","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000298364.png"
"Álex Cerdá","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000145445.png"
"Alexander Gurendal","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217555.png"
"André Almeida","...","https://sortitoutsi.b-cdn.net/uploads/iconface/83152928.png"
"Andrés Caro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000100140.png"
"Arnaut Danjuma","...","https://sortitoutsi.b-cdn.net/uploads/iconface/37051305.png"
"Baptiste Santamaria","...","https://sortitoutsi.b-cdn.net/uploads/iconface/211515.png"
"César Tárrega","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295021.png"
"Cristian Rivero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67246343.png"
"Dani Raba","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67216778.png"
"David Otorbi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300159.png"
"Diego López","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000055904.png"
"Dimitri Foulquier","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85045661.png"
"Eray Cömert","...","https://sortitoutsi.b-cdn.net/uploads/iconface/98033710.png"
"Filip Ugrinic","...","https://sortitoutsi.b-cdn.net/uploads/iconface/98041219.png"
"Hugo Duro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67274349.png"
"Javi Guerra","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000034344.png"
"Javi Navarro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000034336.png"
"Javier Pamies","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000126530.png"
"Jesús Vázquez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/95078288.png"
"José Copete","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67257035.png"
"José Gayà","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67178177.png"
"Julen Agirrezabala","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67277830.png"
"Largie Ramazani","...","https://sortitoutsi.b-cdn.net/uploads/iconface/28116558.png"
"Lucas Beltrán","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14217414.png"
"Lucas Núñez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000300157.png"
"Luis Rioja","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67196000.png"
"Marc Jurado","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000294063.png"
"Marcos Navarro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000301561.png"
"Mario Domínguez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000131782.png"
"Mario González","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000145415.png"
"Mateo Prevedini","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000217806.png"
"Miguel Monferrer","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299716.png"
"Mouctar Diakhaby","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48036643.png"
"Nil Ruiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000161805.png"
"Pepelu","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67207683.png"
"Pere Joan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295523.png"
"Pol Trigueros","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000311929.png"
"Raúl Jiménez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000325319.png"
"Rubén Iranzo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000032467.png"
"Rubén Martínez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299699.png"
"Stole Dimitrievski","...","https://sortitoutsi.b-cdn.net/uploads/iconface/47022611.png"
"Thierry Rendall Correia","...","https://sortitoutsi.b-cdn.net/uploads/iconface/83111501.png"
"Vicent Abril","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214908.png"
`;
const VILLARREAL_PLAYERS_CSV = `"item-title","item-title href","item-title src"
"Adrià Altimira","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67295760.png"
"Adrián Ruiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000294437.png"
"Alberto Moleiro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000028320.png"
"Álex Quevedo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000066275.png"
"Álex Rubio","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000277002.png"
"Alfonso Pedraza","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67212046.png"
"Arnau Forés","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000214415.png"
"Arnau Tenas","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67265794.png"
"Ayoze Pérez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67172040.png"
"César Bonafé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000299684.png"
"Curro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000138488.png"
"Dani Parejo","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67030707.png"
"Daniel Budesca","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000311540.png"
"Daniel Cantero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000295466.png"
"Diego Conde","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67216538.png"
"Eneko Ortiz","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000212041.png"
"Facundo Viveros","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000185815.png"
"Fran Gil","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000221078.png"
"Georges Mikautadze","...","https://sortitoutsi.b-cdn.net/uploads/iconface/49043189.png"
"Gerard Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67115823.png"
"Ilias Akhomach","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000056415.png"
"Juan Foyth","...","https://sortitoutsi.b-cdn.net/uploads/iconface/14186894.png"
"Luis Quintero","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000103756.png"
"Luiz Júnior","...","https://sortitoutsi.b-cdn.net/uploads/iconface/19362984.png"
"Mahamoud Barry","...","https://sortitoutsi.b-cdn.net/uploads/iconface/12095308.png"
"Manor Solomon","...","https://sortitoutsi.b-cdn.net/uploads/iconface/42077304.png"
"Mohamed Dahmouni","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000332648.png"
"Nicolas Pépé","...","https://sortitoutsi.b-cdn.net/uploads/iconface/85136376.png"
"Pau Cabanes","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000395140.png"
"Pau Navarro","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000395112.png"
"Pape Guèye","...","https://sortitoutsi.b-cdn.net/uploads/iconface/48043484.png"
"Rafa Marín","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000051886.png"
"Renato Veiga","...","https://sortitoutsi.b-cdn.net/uploads/iconface/83320123.png"
"Rubén Gómez","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000105094.png"
"Santi Comesaña","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67224142.png"
"Santiago Mouriño","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000090622.png"
"Sergi Cardona","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67294055.png"
"Tajon Buchanan","...","https://sortitoutsi.b-cdn.net/uploads/iconface/72052880.png"
"Tani Oluwaseyi","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000158854.png"
"Thomas Partey","...","https://sortitoutsi.b-cdn.net/uploads/iconface/67175052.png"
"Víctor Moreno","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000215081.png"
"Willy Kambwala","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000006158.png"
"Yakiv Kinareikin","...","https://sortitoutsi.b-cdn.net/uploads/iconface/2000052594.png"
`;

// Club data structure. The root keys MUST be normalized (lowercase, no accents).
const CLUB_DATA: { [canonicalKey: string]: { logoName: string, playerCsv: string, aliases: string[] }} = {
    'alaves': { logoName: 'Deportivo Alavés', playerCsv: ALAVES_PLAYERS_CSV, aliases: ['deportivo alaves'] },
    'athletic club': { logoName: 'Athletic Bilbao', playerCsv: ATHLETIC_CLUB_PLAYERS_CSV, aliases: ['athletic bilbao'] },
    'atletico madrid': { logoName: 'Atlético de Madrid', playerCsv: ATLETICO_MADRID_PLAYERS_CSV, aliases: ['atlético de madrid'] },
    'barcelona': { logoName: 'FC Barcelona', playerCsv: BARCELONA_PLAYERS_CSV, aliases: ['fc barcelona'] },
    'betis': { logoName: 'Real Betis Balompié', playerCsv: BETIS_PLAYERS_CSV, aliases: ['real betis', 'real betis balompié'] },
    'celta vigo': { logoName: 'Celta de Vigo', playerCsv: CELTA_VIGO_PLAYERS_CSV, aliases: ['celta de vigo', 'celta'] },
    'elche': { logoName: 'Elche CF', playerCsv: ELCHE_PLAYERS_CSV, aliases: ['elche cf'] },
    'espanyol': { logoName: 'RCD Espanyol Barcelona', playerCsv: ESPANYOL_PLAYERS_CSV, aliases: ['rcd espanyol', 'rcd espanyol barcelona'] },
    'getafe': { logoName: 'Getafe CF', playerCsv: GETAFE_PLAYERS_CSV, aliases: ['getafe cf'] },
    'girona': { logoName: 'Girona FC', playerCsv: GIRONA_PLAYERS_CSV, aliases: ['girona fc'] },
    'levante': { logoName: 'Levante UD', playerCsv: LEVANTE_PLAYERS_CSV, aliases: ['levante ud'] },
    'mallorca': { logoName: 'RCD Mallorca', playerCsv: MALLORCA_PLAYERS_CSV, aliases: ['rcd mallorca'] },
    'osasuna': { logoName: 'CA Osasuna', playerCsv: OSASUNA_PLAYERS_CSV, aliases: ['ca osasuna'] },
    'oviedo': { logoName: 'Real Oviedo', playerCsv: OVIEDO_PLAYERS_CSV, aliases: ['real oviedo'] },
    'rayo vallecano': { logoName: 'Rayo Vallecano', playerCsv: RAYO_VALLECANO_PLAYERS_CSV, aliases: [] },
    'real madrid': { logoName: 'Real Madrid', playerCsv: REAL_MADRID_PLAYERS_CSV, aliases: [] },
    'real sociedad': { logoName: 'Real Sociedad', playerCsv: REAL_SOCIEDAD_PLAYERS_CSV, aliases: [] },
    'sevilla': { logoName: 'Sevilla FC', playerCsv: SEVILLA_PLAYERS_CSV, aliases: ['sevilla fc'] },
    'valencia': { logoName: 'Valencia CF', playerCsv: VALENCIA_PLAYERS_CSV, aliases: ['valencia cf'] },
    'villarreal': { logoName: 'Villarreal CF', playerCsv: VILLARREAL_PLAYERS_CSV, aliases: ['villarreal cf'] },
};


const clubLogoMap = new Map<string, string>();
const playerPhotoMap = new Map<string, Map<string, string>>();
const clubAliasMap = new Map<string, string>(); // Maps any normalized alias to a canonical key
let isInitialized = false;

const normalizeName = (name: string): string => {
    if (!name) return '';
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
};

const initialize = () => {
    if (isInitialized) return;

    // --- LOGO MAPPING ---
    const logoLines = LOGO_CSV_DATA.trim().split('\n').slice(1);
    const rawLogoUrlMap = new Map<string, string>();
    for (const line of logoLines) {
        const fields = line.split(',').map(field => field.trim().replace(/"/g, ''));
        const fileName = fields[0];
        const githubUrl = fields[1];
        if (fileName && githubUrl && githubUrl.startsWith('https')) {
            const clubName = fileName.replace('.png', '');
            const rawUrl = githubUrl
                .replace('github.com', 'raw.githubusercontent.com')
                .replace('/blob/', '/');
            rawLogoUrlMap.set(normalizeName(clubName), rawUrl);
        }
    }

    // --- PLAYER AND CLUB MAPPING ---
    for (const [canonicalKey, data] of Object.entries(CLUB_DATA)) {
        // A. Build the alias map
        const allNames = [
            canonicalKey,
            normalizeName(data.logoName),
            ...data.aliases.map(normalizeName)
        ].filter(Boolean);
        for (const name of allNames) {
            clubAliasMap.set(name, canonicalKey);
        }
        
        // B. Build the logo map
        const normalizedLogoName = normalizeName(data.logoName);
        if (rawLogoUrlMap.has(normalizedLogoName)) {
            clubLogoMap.set(canonicalKey, rawLogoUrlMap.get(normalizedLogoName)!);
        }

        // C. Build the player photo map with robust parsing
        const clubPlayerMap = new Map<string, string>();
        const playerLines = data.playerCsv.trim().split('\n');
        if (playerLines.length < 2) {
            playerPhotoMap.set(canonicalKey, clubPlayerMap);
            continue;
        }

        const headerLine = playerLines[0];
        const headers = headerLine.split(',').map(h => h.trim().replace(/"/g, ''));
        
        const nameIndex = headers.indexOf('item-title');
        const lowResIndex = headers.indexOf('item-title src');
        const highResIndex = headers.indexOf('submission-preview src');

        if (nameIndex === -1) {
            playerPhotoMap.set(canonicalKey, clubPlayerMap);
            continue;
        }

        for (let i = 1; i < playerLines.length; i++) {
            const line = playerLines[i];
            if (!line) continue;
            
            // Regex to capture content within quotes, handles simple CSV cases.
            const fields = (line.match(/(?:"[^"]*"|[^,]+)/g) || []).map(f => f.replace(/"/g, ''));

            const playerName = fields[nameIndex];
            if (!playerName) continue;

            let finalUrl = '';
            // Prioritize high-res URL and clean it
            if (highResIndex !== -1 && fields[highResIndex] && fields[highResIndex].startsWith('http')) {
                finalUrl = fields[highResIndex].split('?')[0];
            } 
            // Fallback to low-res URL
            else if (lowResIndex !== -1 && fields[lowResIndex] && fields[lowResIndex].startsWith('http')) {
                finalUrl = fields[lowResIndex];
            }

            if (finalUrl) {
                clubPlayerMap.set(normalizeName(playerName), finalUrl);
            }
        }
        playerPhotoMap.set(canonicalKey, clubPlayerMap);
    }
    
    isInitialized = true;
};


const findCanonicalClubKey = (apiClubName: string): string | undefined => {
    initialize();
    const normalized = normalizeName(apiClubName);
    if (!normalized) return undefined;

    // 1. Direct match from alias map
    if (clubAliasMap.has(normalized)) {
        return clubAliasMap.get(normalized);
    }
    
    // 2. Fallback to partial match if no direct alias is found
    let bestMatch: string | undefined = undefined;
    let bestMatchLength = 0;
    
    for (const [alias, canonicalKey] of clubAliasMap.entries()) {
        if (normalized.includes(alias)) {
            if (alias.length > bestMatchLength) {
                bestMatch = canonicalKey;
                bestMatchLength = alias.length;
            }
        }
    }
    return bestMatch;
}

export const getClubLogoUrl = (clubName: string): string | undefined => {
    initialize();
    const canonicalKey = findCanonicalClubKey(clubName);
    return canonicalKey ? clubLogoMap.get(canonicalKey) : undefined;
};

export const getPlayerPhotoUrl = (clubName: string, playerName: string): string | undefined => {
    initialize();
    const canonicalKey = findCanonicalClubKey(clubName);
    if (!canonicalKey) {
        return undefined;
    }

    const clubMap = playerPhotoMap.get(canonicalKey);
    if (!clubMap || clubMap.size === 0) {
        return undefined;
    }

    const normalizedApiPlayerName = normalizeName(playerName);

    // 1. Try for a direct, exact match first.
    if (clubMap.has(normalizedApiPlayerName)) {
        return clubMap.get(normalizedApiPlayerName);
    }

    // 2. If no exact match, perform a fuzzy search to find the best match.
    let bestMatchUrl: string | undefined = undefined;
    let highestScore = 0;

    const apiWords = new Set(normalizedApiPlayerName.split(' ').filter(w => w.length > 1));
    if (apiWords.size === 0) return undefined;

    for (const [normalizedCsvPlayerName, photoUrl] of clubMap.entries()) {
        const csvWords = new Set(normalizedCsvPlayerName.split(' ').filter(w => w.length > 1));
        if (csvWords.size === 0) continue;

        const intersection = new Set([...apiWords].filter(word => csvWords.has(word)));
        const union = new Set([...apiWords, ...csvWords]);

        // Jaccard index for similarity score
        const score = intersection.size / union.size;

        if (score > highestScore) {
            highestScore = score;
            bestMatchUrl = photoUrl;
        }
    }

    // Set a threshold to avoid incorrect low-confidence matches
    if (highestScore >= 0.4) {
        return bestMatchUrl;
    }

    return undefined;
};