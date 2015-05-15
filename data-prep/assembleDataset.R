library(dplyr)

# create R dataframes from csv files
setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep\\output-areas-to-built-up-areas")

# Where 'oa' abbreviates 'output area'
filename <- "OA11_BUASD11_BUA11_LAD11_RGN11_EW_LU.csv"
oa_to_builtup_areas <- read.csv(filename, header=TRUE, sep=",")

setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep\\output-areas-to-constituencies")

filename <- "OA11_PCON11_EER11_EW_LU.csv"
oa_to_constituencies <- read.csv(filename, header=TRUE, sep=",")

setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep\\built-up-areas")

filename <- "BUA_MAR_2011_EW_NC.csv"
builtup_areas <- read.csv(filename, header=TRUE, sep=",")

setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep")

filename <- "constituency-names.csv"
constituencies <- read.csv(filename, header=TRUE, sep=",")

filename <- "population-by-constituency.csv"
population <- read.csv(filename, header=TRUE, sep=",")

filename <- "uk-election-results-2015.csv"
results <- read.csv(filename, header=TRUE, sep=",")

# parse city name from built-up area name
builtup_areas$name <- builtup_areas$BUA11NM
builtup_areas$name <- gsub("\\sBUA", "", builtup_areas$name, perl=TRUE)
builtup_areas$city <- gsub("\\s\\(.*", "", builtup_areas$name, perl=TRUE)

# build look from builtup areas to constituencies, through output areas
oa_to_builtup_areas_short <- oa_to_builtup_areas[c("OA11CD", "BUA11CD")]
builtup_areas_to_constituencies <- merge(builtup_areas, oa_to_builtup_areas_short, by="BUA11CD")

oa_to_constituencies_short <- oa_to_constituencies[c("OA11CD","PCON11CD","PCON11NM")]
builtup_areas_to_constituencies <- merge(builtup_areas_to_constituencies, oa_to_constituencies_short, by="OA11CD")

# list cities that have multiple constituencies
# file <- "builtup-areas-to-constituencies.csv"
# write.csv(builtup_areas_to_constituencies, file,row.names=FALSE, na="")

bua_to_pcon <- unique(builtup_areas_to_constituencies[c("BUA11CD","name", "PCON11CD", "PCON11NM")])
bua_to_pcon <- merge(bua_to_pcon, population, by=c("PCON11CD", "PCON11NM"))
names(bua_to_pcon)[names(bua_to_pcon) == 'name'] <- 'BUA11NM'
bua_to_pcon <- merge(bua_to_pcon, constituencies[c("constituency", "PCON11CD")], by="PCON11CD")

bua_pop <- aggregate(population~BUA11NM, bua_to_pcon, sum)
bua_pop <- arrange(num, desc(population))
names(bua_pop)[names(bua_pop) == 'population'] <- 'buaPopulation'

# estimated population by bua by summing up the population of all of the 
# constituencies associated with it
bua_to_pcon <- merge(bua_to_pcon, bua_pop, by="BUA11NM")
names(bua_to_pcon)[names(bua_to_pcon) == 'population'] <- 'conPopulation'

results_short <- results[c("constituency","party","candidate","votes","voteShare","swing","region","partyAll")]
bua_to_pcon <- merge(bua_to_pcon, results_short, by="constituency")

london_cons <- filter(bua_to_pcon, BUA11NM == "Greater London")
london_cons <- london_cons[c("PCON11NM", "BUA11NM")]
london_cons <- unique(london_cons)

file <- "uk2015.csv"
write.csv(bua_to_pcon, file,row.names=FALSE, na="")

#####

# get lat and long for constituency centroids

# append built-up areas to results dataframe

# append constituency population to results dataframe

# calculate average results for built-up areas in a new column
# for constituencies that do not belong to a built up area,
# show show the single-constituency result in the average result column

# generate a unique list of built-up areas 
# and constituencies that do not belong to a built-up area
# for built-up areas, in the constituency column concatenate the names of the constituent constituencies

# create new column areaName
# if builtupArea then builtupArea
# else constituency

# append lat long centroids to unique list of areas
# if builtupArea then builtup_area_geo$lat, builtup_area_geo$long
# else constituency_geo$lat, constituency_geo$long

# calculate chi-square test statistic for voteShare by party results comparing each area to each other area

# write the result to data.json


