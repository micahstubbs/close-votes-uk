votes <- matrix(c(28.9, 37.1, 6, 8, 5.2, 7.2, 1.4, 2.1, 0.3, 1.8, 1.2, 23.4, 
                  8.7, 11, 5.4, 11.2, 2.4, 11.2, 0.6, 23.1, 1.3, 1.4),ncol=11,byrow=TRUE)
colnames(votes) <- c("VVD", "PvdA", "PVV", "SP", "CDA", "D66", "CU", "GrLinks", "SGP", "PvdD", "50+")
rownames(votes) <- c("Aa en Hunze","Aalburg")
votes <- as.table(votes)
votes

# chi-square test of independence
chisq.test(votes)

# euclidean distance
dist(votes, method = "euclidean")