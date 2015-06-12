library(leaflet)
m = leaflet(data) %>% addTiles() 
m = m %>% setView(-2.547855,54.00366, zoom = 5) %>% addCircles(lat = ~ lat, lng = ~ long )
m