
####

request_data <- paste0("[",paste(paste0("\"",gsub(\\s, \\%20, builtup_areas$city, perl=TRUE),"%20UK\""),collapse=","),"]")
                       
gsub("\\s", "%20", builtup_areas$cit[2], perl = TRUE)

#####

# get lat and long for named city in built-up areas
library(httr)
library(XML)

# get latitude and longitude values for the addresses in the currentLocationAddress column
base_url  <- "http://www.datasciencetoolkit.org/v1/document"
postvars <- paste0(paste(paste0("?documentContent=",gsub("\\s", "%20", builtup_areas$city, perl = TRUE),"%20UK","&documentType=text/plain&appid=''"),collapse=","))
url <- paste0(base_url, postvars, sep="")
response <- POST(url)
xml <- xmlTreeParse(response)
xmltop <- xmlRoot(xml)
rlat <- as.numeric(unlist(xmltop[["document"]][["placeDetails"]][["place"]][["centroid"]][["longitude"]][[1]])[2])
rlong <- as.numeric(unlist(xmltop[["document"]][["placeDetails"]][["place"]][["centroid"]][["latitude"]][[1]])[2])
rname <- xmltop[["document"]][["placeDetails"]][["place"]][["name"]][[1]]

rname
rlat
rlong

# merge the lat and long values into the data dataframe
data <- merge(builtup_areas, geocode, by.x = c("city"), by.y = c("row.names"))

#####


cities <- read.table(
  "cities1000.txt",
  sep="\t", header=FALSE, check.names=F, stringsAsFactors=F, fill = TRUE)

colnames(cities)[1] <- "geonameid"       
colnames(cities)[2] <- "name"            
colnames(cities)[3] <- "asciiname"       
colnames(cities)[4] <- "alternatenames"  
colnames(cities)[5] <- "latitude"        
colnames(cities)[6] <- "longitude"       
colnames(cities)[7] <- "featureClass"   
colnames(cities)[8] <- "featureCode"    
colnames(cities)[9] <- "countryCode"    
colnames(cities)[10] <- "cc2"             
colnames(cities)[11] <- "admin1Code"     
colnames(cities)[12] <- "admin2Code"     
colnames(cities)[13] <- "admin3Code"     
colnames(cities)[14] <- "admin4Code"     
colnames(cities)[15] <- "population"      
colnames(cities)[16] <- "elevation"       
colnames(cities)[17] <- "dem"             
colnames(cities)[18] <- "timezone"        
colnames(cities)[19] <- "modification date"

cities <- filter(cities, countryCode == "GB")

####