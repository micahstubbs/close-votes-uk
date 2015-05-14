The main 'geoname' table has the following fields :
---------------------------------------------------
geonameid"        : integer id of record in geonames database
name"             : name of geographical point (utf8) varchar(200)
asciiname"        : name of geographical point in plain ascii characters, varchar(200)
alternatenames"   : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(10000)
latitude"         : latitude in decimal degrees (wgs84)
longitude"        : longitude in decimal degrees (wgs84)
feature class"    : see http://www.geonames.org/export/codes.html, char(1)
feature code"     : see http://www.geonames.org/export/codes.html, varchar(10)
country code"     : ISO-3166 2-letter country code, 2 characters
cc2"              : alternate country codes, comma separated, ISO-3166 2-letter country code, 60 characters
admin1 code"      : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
admin2 code"      : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80) 
admin3 code"      : code for third level administrative division, varchar(20)
admin4 code"      : code for fourth level administrative division, varchar(20)
population"       : bigint (8 byte int) 
elevation"        : in meters, integer
dem"              : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
timezone"         : the timezone id (see file timeZone.txt) varchar(40)
modification date : date of last modification in yyyy-MM-dd format"
AdminCodes:
Most adm1 are FIPS codes. ISO codes are used for US, CH, BE and ME. UK and Greece are using an additional level between country and fips code. The code '00' stands for general features"
where no specific adm1 code is defined.



colnames(cities)[1] <- "geonameid"       
colnames(cities)[2] <- "name"            
colnames(cities)[3] <- "asciiname"       
colnames(cities)[4] <- "alternatenames"  
colnames(cities)[5] <- "latitude"        
colnames(cities)[6] <- "longitude"       
colnames(cities)[7] <- "feature class"   
colnames(cities)[8] <- "feature code"    
colnames(cities)[9] <- "country code"    
colnames(cities)[10] <- "cc2"             
colnames(cities)[11] <- "admin1 code"     
colnames(cities)[12] <- "admin2 code"     
colnames(cities)[13] <- "admin3 code"     
colnames(cities)[14] <- "admin4 code"     
colnames(cities)[15] <- "population"      
colnames(cities)[16] <- "elevation"       
colnames(cities)[17] <- "dem"             
colnames(cities)[18] <- "timezone"        
colnames(cities)[19] <- "modification date"
