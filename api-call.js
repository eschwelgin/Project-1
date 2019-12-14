//https://sandbox-api.brewerydb.com/v2/
//Key:b04f7e596969ab2a01ec840dc8a0d9c0
<html>
<head>


</head>
<body>
<script>







$.ajax({
    url: "https://sandbox-api.brewerydb.com/v2/beer/O3tmVI/breweries/?key=abcdef",
    method: "GET"
  })
    .then(function(response) {
        console.log(response)
    });



</script>

</body>
</html>
