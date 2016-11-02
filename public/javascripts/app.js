// $.ajax({
//     url: '/myeventattendance',
//     type: 'get',
//     dataType: 'json',
//     success: function(data) {
//         for (var prop in data) {
//             console.log(data[0]);
//             $('#message-container').append('<br>' + prop + ' : ' + data + '<br>')
//         }
//     },
//     error: function(err) {
//         console.log(err)
//     }
// })


$.ajax({
    url: '/myeventattendance2',
    type: 'get',
    dataType: 'json',
    success: function(data) {
        for (i = 0; i < data.length; i++) {
            // Runs 5 times, with values of step 0 through 4.

            $('#message-container').append('Event: ' + data[i].event_name + '<br>');
            $('#message-container').append('Status: ' + data[i].status + '<br>');
            $('#message-container').append('Comments: ' + data[i].comments + '<br><br>');
        }
    },
    error: function(err) {
        console.log(err)
    }
})

$.ajax({
    url: '/eventattendance',
    type: 'get',
    dataType: 'json',
    success: function(data) {
        for (i = 0; i < data.length; i++) {
            // Runs 5 times, with values of step 0 through 4.

            $('#message-container1').append('Event: ' + data[1].event_name + '<br>');
            $('#message-container1').append('Event: ' + data[1].user_id + '<br>');
            $('#message-container1').append('Status: ' + data[1].status + '<br>');
            $('#message-container1').append('Comments: ' + data[1].comments + '<br><br>');
        }
    },
    error: function(err) {
        console.log(err)
    }
})