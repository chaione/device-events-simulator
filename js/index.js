/**
 * Created by khoat_000 on 3/9/14.
 */
$(document).ready(function() {
    $('#get-beacon').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else {
            $.ajax({
                url: 'http://contexthub-staging.herokuapp.com/api/beacons',
                headers: {
                    'Authorization': 'Token token="' + app_id + '"',
                    'CARBON_DEVICE_ID': device_id
                }
            }).done(function(msg) {
                window.localStorage.result = JSON.stringify(msg);
                window.localStorage.msg = 'Success';
                window.location = './result.html';
            }).fail(function(xhr) {
                window.localStorage.msg = 'Error ' + xhr.responseText;
                window.location = './result.html';
            });
        }
    });

    $('#create-beacon').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.localStorage.method = 'post';
            window.location = './beacon_form.html';
        }
    });

    $('#get-beacon-by-name').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.localStorage.method = 'get';
            window.location = './beacon-name.html';
        }
    });

    $('#delete-beacon').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.localStorage.method = 'delete';
            window.location = './beacon-name.html';
        }
    });

    $('#edit-beacon').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        var name = prompt("Please enter beacon name");
        if(name && name !== "") {
            if(app_id === '') {
                alert('The App ID is required');
            } else if(device_id === '') {
                alert('The device ID is required');
            } else {
                window.localStorage.clear();
                window.localStorage.app_id =  app_id;
                window.localStorage.device_id = device_id;
                window.localStorage.name = name;
                window.localStorage.method = 'patch';
                window.location = './beacon_form.html';
            }
        } else {
            alert('The Beacon name is required');
        }
    });

    $('#get-devices').click(function() {
        var app_id = $('#select_app_id').val();
        if(app_id === '') {
            alert('The App ID is required');
        } else {
            $.ajax({
                url: 'http://contexthub-staging.herokuapp.com/api/devices',
                headers: {
                    'Authorization': 'Token token="' + app_id + '"'
                },
                done: function() {
                    alert('success');
                },
                fail: function() {
                    alert('error');
                }
            }).done(function(msg) {
                window.localStorage.result = JSON.stringify(msg);
                window.localStorage.msg = 'Success';
                if(!msg)
                    window.localStorage.msg += ' but the API sent no data back';
                window.location = './result.html';
            }).fail(function(xhr) {
                window.localStorage.msg = xhr.responseText;
                window.location = './result.html';
            });
        }
    });

    $('#edit-devices').click(function() {
        var id = prompt("Please enter device id");
        if(id && id !== NaN) {
            var app_id = $('#select_app_id').val();
            if(app_id === '') {
                alert('The App ID is required');
            } else {
                window.localStorage.clear();
                window.localStorage.app_id = app_id;
                window.localStorage.id = id;
                window.location = './device_form.html';
            }
        } else {
            alert("The device_id is required")
        }
    });

    $('#create-event').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.location = './event_form.html';
        }
    });

    $('#get-geofences').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.method = 'get';
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.location = './geofence_form.html';
        }
    });

    $('#create-geofence').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.method = 'post';
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.location = './geofence_form.html';
        }
    });

    $('#delete-geofence').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        var name = prompt("Enter geo_fence name");
        if(!name || name === '') return;

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            $.ajax({
                url: 'http://contexthub-staging.herokuapp.com/api/geo_fences/' + name,
                type: 'delete',
                headers: {
                    'Authorization': 'Token token="' + app_id + '"',
                    'CARBON_DEVICE_ID': device_id
                }
            }).done(function(msg) {
                window.localStorage.result = JSON.stringify(msg);
                window.localStorage.msg = 'Success';
                if(!msg)
                    window.localStorage.msg += ' but the API sent no data back';
                window.location = './result.html';
            }).fail(function(xhr) {
                window.localStorage.msg = 'Error ' + xhr.status + " " + xhr.responseText;
                window.location = './result.html';
            });
        }
    });

    $('#get-geofence').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        var name = prompt("Enter geo_fence name");
        if(!name || name === '') {
            alert("A geofence name is required");
            return;
        }

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            $.ajax({
                url: 'http://contexthub-staging.herokuapp.com/api/geo_fences/' + name,
                type: 'get',
                headers: {
                    'Authorization': 'Token token="' + app_id + '"',
                    'CARBON_DEVICE_ID': device_id
                }
            }).done(function(msg) {
                window.localStorage.result = JSON.stringify(msg);
                window.localStorage.msg = 'Success';
                if(!msg)
                    window.localStorage.msg += ' but the API sent no data back';
                window.location = './result.html';
            }).fail(function(xhr) {
                window.localStorage.msg = xhr.responseText;
                window.location = './result.html';
            });;
        }
    });

    $('#edit-geofence').click(function() {
        var app_id = $('#select_app_id').val();
        var device_id = $('#select_device_id').val();

        var name = prompt("Enter geo_fence name");
        if(!name || name === '') {
            alert("A geofence name is required");
            return;
        }

        if(app_id === '') {
            alert('The App ID is required');
        } else if(device_id === '') {
            alert('The device ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.method = 'patch';
            window.localStorage.app_id =  app_id;
            window.localStorage.device_id = device_id;
            window.localStorage.name = name;
            window.location = './geofence_form.html';
        }
    });

    $('#get-manifest').click(function() {
        var app_id = $('#select_app_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else {
            $.ajax({
                url: 'http://contexthub-staging.herokuapp.com/api/manifest',
                headers: {
                    'Authorization': 'Token token="' + app_id + '"'
                }
            }).done(function(msg) {
                window.localStorage.result = JSON.stringify(msg);
                window.localStorage.msg = 'Success';
                if(!msg)
                    window.localStorage.msg += ' but the API sent no data back';
                window.location = './result.html';
            }).fail(function(xhr) {
                window.localStorage.msg = xhr.responseText;
                window.location = './result.html';
            });;
        }
    });

    $('#get-vault-data').click(function() {
        var app_id = $('#select_app_id').val();

        if(app_id === '') {
            alert('The App ID is required');
        } else {
            $.ajax({
                url: 'http://contexthub-staging.herokuapp.com/api/vault/data',
                headers: {
                    'Authorization': 'Token token="' + app_id + '"'
                }
            }).done(function(msg) {
                window.localStorage.result = JSON.stringify(msg);
                window.localStorage.msg = 'Success';
                if(!msg)
                    window.localStorage.msg += ' but the API sent no data back';
                window.location = './result.html';
            }).fail(function(xhr) {
                window.localStorage.msg = xhr.responseText;
                window.location = './result.html';
            });;
        }
    });

    $('#update-vault-data').click(function() {
        var app_id = $('#select_app_id').val();

        var container = prompt("Enter container's name");
        if(!container || container === '') {
            alert("A vault's container is required");
            return;
        }

        var data_id = prompt("Enter the data id");
        if(!data_id || data_id === '') {
            alert("Data ID is required");
            return;
        }

        if(app_id === '') {
            alert('The App ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.method = 'patch';
            window.localStorage.app_id =  app_id;
            window.localStorage.container = container;
            window.localStorage.data_id = data_id;
            window.location = './vault_form.html';
        }
    });

    $('#delete-vault-data').click(function() {
        var app_id = $('#select_app_id').val();

        var container = prompt("Enter container's name");
        if(!container || container === '') {
            alert("A vault's container is required");
            return;
        }

        var data_id = prompt("Enter the data id");
        if(!data_id || data_id === '') {
            alert("Data ID is required");
            return;
        }

        if(app_id === '') {
            alert('The App ID is required');
        } else {
            var _url = 'http://contexthub-staging.herokuapp.com/api/vault/data/' + container + '/'+ data_id;

            $.ajax({
                url: _url,
                type: 'delete',
                crossDomain: true,
                headers: {
                    'Authorization': 'Token token="' + app_id + '"'
                },
                done: function() {
                    console.log(json);
                    alert('success');
                },
                fail: function() {
                    alert('error');
                }
            });
        }
    });

    $('#create-vault-data').click(function() {
        var app_id = $('#select_app_id').val();

        var container = prompt("Enter container's name");
        if(!container || container === '') {
            alert("A vault's container is required");
            return;
        }

        if(app_id === '') {
            alert('The App ID is required');
        } else {
            window.localStorage.clear();
            window.localStorage.method = 'post';
            window.localStorage.app_id =  app_id;
            window.localStorage.container = container;
            window.location = './vault_form.html';
        }
    });
});
