# create R dataframes from csv files
setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep\\output-areas-to-built-up-areas")

# Where 'oa' abbreviates 'output area'
filename <- "OA11_BUASD11_BUA11_LAD11_RGN11_EW_LU.csv"
oa_to_builtup_areas <- read.csv(filename, header=TRUE, sep=",")

setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep\\output-areas-to-constituencies")

filename <- "OA11_PCON11_EER11_EW_LU.csv"
oa_to_constituencies <- read.csv(filename, header=TRUE, sep=",")

setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep")

filename <- "constituency-names.csv"
constituencies <- read.csv(filename, header=TRUE, sep=",")

filename <- "population-by-constituency.csv"
population <- read.csv(filename, header=TRUE, sep=",")

filename <- "uk-election-results-2015.csv"
results <- read.csv(filename, header=TRUE, sep=",")

# get lat and long for built-up area centroids

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


