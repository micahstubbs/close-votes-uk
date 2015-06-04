setwd("/Users/m/workspace/blocks/close-votes-uk/data-prep/similarity-calcs")
votes_long <- read.csv("../nl-2012-voteshare-matrix.csv",head=TRUE,sep=",")
# votes_wide <- data.frame(t(votes_long))

# create a character vector from the city names in the first row
#cols <- unname(unlist(votes_wide[1,]))
# use the vector to name the columns
#colnames(votes_wide) <- cols
# remove the first row from the data frame
# votes_wide = votes_wide[-1, ]         
rows <- unname(unlist(votes_long[1]))
rownames(votes_long) <- rows
votes_long <- subset(votes_long, select = -c(city))

v <- votes_long
v2 <- v[c(1,4),]
dist(v2,  method = "euclidean")

# validated similarity stat is euclidean distance, will implement in node script
