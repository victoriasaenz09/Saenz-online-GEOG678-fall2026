function getExtent(data)
{
	var extent =
	{
		minLat: data[0].lat,
		maxLat: data[0].lat,
		minLon: data[0].lon,
		maxLon: data[0].lon
	};
	data.forEach(element =>
	{
		if (element.lat < extent.minLat) { extent.minLat = element.lat; }
		if (element.lat > extent.maxLat) { extent.maxLat = element.lat; }
		if (element.lon < extent.minLon) { extent.minLon = element.lon; }
		if (element.lon > extent.maxLon) { extent.maxLon = element.lon; }
	});
	
	return extent;
}


function findClosestPoint(data, targetLat, targetLon)
{
	var closestPoint = null;
	var closestDistance = null;
	
	data.forEach(element =>
	{
		var dLat = element.lat - targetLat;
		var dLon = element.lon - targetLon;
		var distance = Math.sqrt(dLat * dLat + dLon * dLon);
		
		if (closestPoint == null || distance < closestDistance)
		{
			closestPoint = element;
			closestDistance = distance;
		}
	});
	return closestPoint;
}


function findTopLeft(data)
{
	var extent = getExtent(data);
	return findClosestPoint(data, extent.maxLat, extent.minLon);
}


function findTopRight(data)
{
	var extent = getExtent(data);
	return findClosestPoint(data, extent.maxLat, extent.maxLon);
}


function findBottomLeft(data)
{
	var extent = getExtent(data);
	return findClosestPoint(data, extent.minLat, extent.minLon);
}


function findBottomRight(data)
{
	var extent = getExtent(data);
	return findClosestPoint(data, extent.minLat, extent.maxLon);
}


function Run()
{
	var data = theJSON.data;
	
	var topLeftPoint = findTopLeft(data);
	var topRightPoint = findTopRight(data);
	var bottomLeftPoint = findBottomLeft(data);
	var bottomRightPoint = findBottomRight(data);
	
	var boundingBox = 
	{
		topLeft: topLeftPoint,
		topRight: topRightPoint,
		bottomLeft: bottomLeftPoint,
		bottomRight: bottomRightPoint
	};
	
	
	console.log("Bounding box computed for victoria.saenz@tamu.edu: ");
	console.log(boundingBox);

}