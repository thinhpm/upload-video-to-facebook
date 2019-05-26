const fs = require('fs');
const fbUpload = require('facebook-api-video-upload');
var args;

function getData() {
    const datas = require('minimist')(process.argv.slice(2));
    var id = datas['id'];
    var title = datas['title']
    var des = datas['des']
    var access_token = datas['token'];
    var video = datas['video']; 
    
    return {
        'id': id,
        'title': title,
        'des': des,
        'access_token': access_token,
        'video': video
    }
}

function handle() {
    var datas = getData();
    args = {
        token: datas['access_token'], // with the permission to upload
        id: datas['id'], //The id represent {page_id || user_id || event_id || group_id}
        stream: fs.createReadStream(datas['video']), //path to the video,
        title: datas['title'],
        description: datas['des'],
        // thumb: {
        //     value: fs.createReadStream('image.jpg'),
        //     options: {
        //         filename: 'image.jpg',
        //         contentType: 'image/jpg'
        //     }
        // }
        // if you want the default thumb from the video just remove the field
        // you can add any extra fields from the api https://developers.facebook.com/docs/graph-api/reference/page/videos/#Creating
        // all keys except token, id, stream are passed to the final request
    };
         
    fbUpload(args).then((res) => {
        console.log('res: ', res);
        //res:  { success: true, video_id: '1838312909759132' }
    }).catch((e) => {
        console.error(e);
    });
}

handle()