setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep")

filename <- "uk2015.csv"
votes <- read.csv(filename, header=TRUE, sep=",")

colnames(votes)

library(dplyr)

buas <- group_by(votes, BUA11NM)
bua_summary <- summarise(buas,
          pcons = n_distinct(PCON11NM),
          parties = n_distinct(party)
          )

# drop grouped levels so that we can sort by number of constituencies
levels(droplevels(bua_summary$BUA11NM))
bua_summary <- arrange(bua_summary, desc(pcons))

head(bua_summary)

# calculate population by BUA
population <- votes[c("constituency", "PCON11CD", "PCON11NM", "BUA11CD", "BUA11NM", "population")]
