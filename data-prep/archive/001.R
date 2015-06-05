setwd("C:\\Users\\m\\workspace\\blocks\\close-votes-uk\\data-prep")

filename <- "uk2015.csv"
votes <- read.csv(filename, header=TRUE, sep=",")

colnames(votes)

library(dplyr)

buas <- group_by(votes, BUA11NM)
bua_summary <- summarise(buas,
          constituencies = n_distinct(PCON11NM),
          parties = n_distinct(party)
          )

