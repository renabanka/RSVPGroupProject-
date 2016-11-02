$.ajax({
    url: '/myeventattendance',
    type: 'get',
    dataType: 'json',
    success: function(data) {
        for (var prop in data[1]) {
            console.log(data[1]);
            $('#message-container').append('<br>' + prop + ' : ' + data[1] + '<br>')
        }
    },
    error: function(err) {
        console.log(err)
    }
})