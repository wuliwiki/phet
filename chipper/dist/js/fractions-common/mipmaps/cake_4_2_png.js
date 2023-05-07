/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
const mipmaps = [{
  "width": 219,
  "height": 166,
  "url": "data:image/png;base64,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bOGzN93w18/L5rsf+OZjPP9N65k8UyN6sMKWZX2Umk28Khe6xCuJ95xv4hzz9QhVxbSfkBa67aYP3nzm4J6rkZCHb9nNzr/fh0aezornTC7Ae6UdeO9JfML55oC5kmfD0EZM+wlpkdtvv/23vvLp267rDoAElgXgJ5rggAB8PaZdBEDA+eeADOAw7SikBfYdOLDu5uuv+3h3AtkQNATP4zL8lMOYxUVogff8ybs/6qdnVuTyoBizNAgp+/EDO0d/fNe/vLa/AF4xZskQUrZr164dvuGzEmDMkiKkLG7GeYxZgoSUFTuL85ylGLOkCCm7ZPPmAwR4VYxZUoSUrVu7dqxncPB01MSYJUVI2fDgwNzyNWuP1mNwGLN0CC2w9uJNB6oeHMYsHUILbN1+2UM1wDmMWTKEFtgyOrovAVQxZskQWuDijRc/kilkq95jzJIhtMCqkZGTvcMrHotijFkyhBYoFgrRmo2bDlVjcBizNAgtsunS0YergMOYpUFokc1btuytA85hzJIgtMjo1tH9OFCPMUuC0CLr1617tNjfNxknGLMkCC2yfHj51MBFI482YnAYs/gJLRKIY93GS/ZXE3AYs/gJLbRl2/Y9VcA5jFn0hBbasnV0b5PHKcYsekILbdq46bBkXeQ9xix6QgutWbNmvHd45XjUxJhFT2ih3u6u6qoNFx+pReAwZnETWmz9pkv2VwGHMYub0GJbtm57qAY4hzGLmtBio6Oj+xVQxZhFTWixDRs2HOvoLc42E4xZ1IQWu2jlytPLVlw0FsXgMGbxElosmwl11boNB6tNjFnUhBY7fvz4yoeP7vllDcA5jFm0hBb7u2984k/7tzdHIgWnGLNoCS107z33bd83+4N3bX3BauoBqGLMoiW0iCbwmS/+1QclHxUaCwkUMniPMYuW0CJf/+o3X1nu2f8br3jzNrb96go6hjpoNMFhzOIU0iLNZhI2GjGF3pANg/1c+7bR+P4/uy/jsjw5pa2pQuL5hTjA8zglxLSdkBZ54+//zncbwew77/jY5z42uLqY7Y63fHVe7n9DpaEZHD+jIJkgkkwQoTjakKq6XD5fz3d1L6iq4+ekgFQqndsvv/xHmLbjVJWWUThy8PjQ2PjY6iBw6kIn/D/qVYpdxYXeZX3z3nuhDamqy+XyjWKxWFZVxy+op9hZD8MwwbSVkFZycPHmtRMXb147gTGLnGCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJhWCMSYVgjEmFYIxJxX8B2bEmlat0LJ0AAAAASUVORK5CYII="
}, {
  "width": 110,
  "height": 83,
  "url": "data:image/png;base64,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"
}, {
  "width": 55,
  "height": 42,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAAklEQVR4AewaftIAAAIhSURBVO3BTUgUUQDA8f+bebPjfpCKCyapFIZEiESB0LmEpAghoaCOChFRx7osBnWJiI4hdQg8RCUUhEnppSgIIdCEsA5BYH4tq+uurO7s7LyCOgTJaCnLjrzfD03b5vr6+vawXbW27B8YHHxRTZkw2ELtV3e2Ph671UuZkGyheGMsv7qUa7ry6PideINdF4oYcatChoVQESD0cTj98O7FlzcoEckmPOi/1zDmPO2ubbIOY6q9K1mnPlpVbIm6eZZGs7hJB3fRxcsUEXnF3IJdSwlJ/sOF2yfO1zR7Zz8XnxyQi/nY7NAK3niOcEc1Xsal8HoFAViAxS8CQdhRIUpI8g96bnZ0VzUWLq0up1tSwzlhTzjEDElY8JPEyXkYEZNyIdmA2e9J8/rzM/0e2a7FkYwV/wqWaYAp+ZM34yBqJOVCso7UfFokBjqHcqnl9qo3q8SVBJM1VXwqAAXWolCYnmtRQibryO/7cH95IdsVH8kTFZLNyDhqYnxq9hklIvFxsv3oqeTE3GmRcUmm82yEUgql+JuAFGFKSeJjenIyYbybirFF3PpmSsnAj1KVBJiBD8O2pwkwAx8ufCPADHwUbfsLAWbg48ixjlcFhSKgDHwkeq+9lzW7FggoAx/VlTs8r1icJ6AMfPRcPncw1hapI6AkPnLRmbZDnbvn3o7mljy34Cm34LFBQggPoVx+E4Blh6bRNE3TNE3TNE3TNG2b+gFuksEK+jc4KwAAAABJRU5ErkJggg=="
}, {
  "width": 28,
  "height": 21,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAAklEQVR4AewaftIAAAEpSURBVO3BQSsEUQAH8P97894OU7taRuEDODm4uEhIHFxc+Abi4KCcXQlfQE0K5RNQ4kSyR0k5rCgUs81l96Cd3TczzXvaIpPENkw5zO+Hf8myrDz+iIYmmIOVtf6xXn518nCLXyL4xu7eVttjx8G8pstp1xa5lhAZEsLwa/JudfF0BDEwfGFuY3LA6KwvXz/vDLOLIC8BsBAIbwI0BJKWERPDJwubo7PSKa/r556pC4IGmSWATvBBEcTEEDE1Md5Xfaqs5M7qpkcIPLypA0opvPMVoYiJIaJULC45BbsLP5BZE3FRRGV0BwmjiDB6ugsSUEgQRcT+4dExMfIvSJCGCBuXQ6Tdm3HvPV9RJhTlQlEuFOVCUS6g8Ro0XiN6q12quttIpVKpZrwCgMVkxNNynCMAAAAASUVORK5CYII="
}, {
  "width": 14,
  "height": 11,
  "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAklEQVR4AewaftIAAACfSURBVGNABzNnzuRkIAIwMiCBBYtns9/iXtPM+PGPOPPP/7+aMvalMuAALAxQkNFo0X7txMwk5i//xBi//mf48/7/awYGhlQGHICFAQhMFeRDXx58UfTh5T82BiD4//8/wz9GJkYGPICFAQgYOTl/Pjl2g5WRAQH+s/My4ANMDECg5i9/kVVN9PN/Zrbv/5nZvv9nZvvOwMT4nWEUkAcAgOgyPqYfYbkAAAAASUVORK5CYII="
}];
mipmaps.forEach(mipmap => {
  mipmap.img = new Image();
  const unlock = asyncLoader.createLock(mipmap.img);
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement('canvas');
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext('2d');
  mipmap.updateCanvas = () => {
    if (mipmap.img.complete && (typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0)) {
      context.drawImage(mipmap.img, 0, 0);
      delete mipmap.updateCanvas;
    }
  };
});
export default mipmaps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3luY0xvYWRlciIsIm1pcG1hcHMiLCJmb3JFYWNoIiwibWlwbWFwIiwiaW1nIiwiSW1hZ2UiLCJ1bmxvY2siLCJjcmVhdGVMb2NrIiwib25sb2FkIiwic3JjIiwidXJsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInVwZGF0ZUNhbnZhcyIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwiZHJhd0ltYWdlIl0sInNvdXJjZXMiOlsiY2FrZV80XzJfcG5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCBhc3luY0xvYWRlciBmcm9tICcuLi8uLi9waGV0LWNvcmUvanMvYXN5bmNMb2FkZXIuanMnO1xyXG5cclxuY29uc3QgbWlwbWFwcyA9IFtcclxuICB7XHJcbiAgICBcIndpZHRoXCI6IDIxOSxcclxuICAgIFwiaGVpZ2h0XCI6IDE2NixcclxuICAgIFwidXJsXCI6IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFOc0FBQUNtQ0FZQUFBQlRQL3BmQUFBQUFrbEVRVlI0QWV3YWZ0SUFBQTc2U1VSQlZPM0JlYkNkZDFuQThlL3ZlZCt6M0hQUDNYSzNKTDNabXpUTlRkS21yUlJabFFJRlowQmNjSkFSMlhFYy83QWRjY0F5SUdWYUJ0RXAwN0k2QW9xVmZYTzBJRktMTTlxTnBVblROSHVhcExtOVdlNSs3OW5mOTd5L3g2YU9vRTYzUVBPZW5IdWZ6OGVwS3NhWTgwOHd4cVJDTU1ha1FqREdwRUl3eHFSQ01NYWtRakRHcEVJd3hxUkNNTWFrUWpER3BFSXd4cVJDTU1ha1FqREdwRUl3eHFSQ01NYWtRakRuVEZXNTVaWmIvdURPTys5OE1jWThTNEk1Wjd0MjdScTk0YjN2L3N6Tk45MTRNOFk4UzRJNVp4MGRoZXFhTmF0ODFHZ01WeXFWRUdPZUJjR2NzM3crVndmWDhPcXpTWktFR1BNc0NPYWNWU3YxVEJoa3EyZE9uUnE1Kys1N3JzS1laMEV3NTJUaXpHVFA5VGUrN2RzVlp2cWwwNGZ2dmVYdGQ5NTExMTB2eEpobklKaHpzbi9mZ1UxdVlPcUtOOXgwR2E5Ny94WTJ2cUE3Ly9EKzNUc3c1aG1FbUhPeXJLOS9hbUJvV1hYekM0Y0xtamhLNVFWS3MvT0RHUE1NUXN3NXlXYXpqWHJaUi9WS1hIQUVTT0JJZkJ4aXpETUlNZWRrV2QreXVjRG5Ta25pZXpOQlFMNGp3OHo4MUhLZUk5NHJjVDNoQ1FyZWUxZXQxcktxNmxBSU1xSjlBOTBSb0ppMkVtTE9pUVRpazVqWWU0VVFNcm1BU0RUTDA0anJDZVZTTlRzek85TXpQVDAxY1ByTXFSWDFxTm8xT3o4ejBJaXF4ZG1GcVdFdmNlZjAzT1J3bVBmNWhjcmNJSS9yS0diSWRnWXlNVEV4cEtwQm1CRk9ISnJNLzk0cnI3LytIZTk4KzVjeGJTWEVuSlBPenM1NklkTTlGZFhqOWJsY2prd3U1TlRjeFBKR1dabVlQTjA3Tm5aaTliR3hJeHNucGsrdW1xdE1qY3hXSmtZYU9yK2lwdk1ycFNQcURUcWJ2ZGt1RFR1NlEvSXJBOEtjMEZITWt1OE1HUzVreU9SQ3N0a09jQTRKSEJJNHduQTF6a0d1RUhMZmQyTWUrOUhZZWt6YkNUSG54anVTaHFzbHNjYzVLSFIyTUhiNmtXM3Yrc0JyN2trNjV6ZGtlcU9CN3VFZzZOcVVwZGlYWTZBM1Q2R1lKZCs1Z2t3bUlBZ0RIQTdsY1FxcW9LcW9WOVNEVjBXOW9vQjZSWnNReFlDQ1Q1U0ZxWWhNVXhOTTJ3a3hUNnM4Vnd1T0h6OCtzdS9nbm0zN2p1eStlbXptMEpYSHhnNWR2a08zNElCQVFxU3JNWHpGVzRQaHdkVnJDU1RnTEorQWVzVjd4U2RLVlBWVTQ0ZzQ4alRxVGFKNlF0eElhRWFlcU5Za3JpYzBxazJTdXFkUmpzRkRBRFRxQ1VuczhZbVN6UVFjL01rSnJ0bU9hVU1oNXYrb2xTTFp1My92eGdOSGQxLzk0UDRmdnZUa3d1SG51WjdTK3E2VldoaThxcE1kNjNxWStGU09xSnFBZ3lEajZPak00bnlHNmx5VFdxVk9yUkpUV1lpb2wySnE4ekgxaFpqNmJFUnpvVWx6dm9sZlNIQjFqMFFnc2VKaUNOVWhzWkoxZ21zcVlTQjBoQUc1MktPcW5KVUxBNHFQTm1BSHBnMkZMSEZKVXhrZk85bjM0TU0vZWQ3T0EvZGNlN3AyNEtYTjR1Um8zNW93MS8rcUloc0dlK2pvSE1JNXdUY1ZGempDTUtCZWJvSnpoRm1oVm82NSsrdEh5WW9RblduQWJJTE9KV1FqeU1TT3JIZjBJR1J3NUlLQVFBSUNjWWc0Y09BeWppZmtRUldjQXdWVXdYWHdVNWxBeU9kRFZERnRLR1FKOGdrYzNIOW8xYjBQL09CVnU0L2YvZXZsY096cS9Jckd3TkNWbll3dTc2S2pzQWJVa1NSSzB2UXNURWJVS2pIejAzV21UMVk1Y1dDVzBaY3N4d0VTQ3RsQTRCL25HT2d1a0JNaEYrUUlBb2NMSFdRQUJ3b29vS29vb0VEQy8xQ2VvUHczNVdlVW54SlZza0ZBcFZUcXdyU2RrQ1hrNk9FVGczZi82QWV2MlBuSXY3OStTZys4ZkdCVFVMem9WVDEwOVE0U0JBRkpyQ1JOVDJrbW9scUttVHBaNGZTeEV0UEh5cFJPVlBHVE1kMDFRV3NOb2pnQkJ4STRKQ1AwNTdJTWRPZUp2YUtxSkp5bFBFRjVUcWhDUGhPeU1EZmJqMms3SVl2Yy9FdzUrNzEvKzg2cmYzTG9ydGVmanZkZVcxd2RENHk4ckkrTGw2MENkU1N4cDdhUUVOVWF6TTgwT0hPaXhNa0Q4OHdmcVNCbllub2FBY1BaSEZzS1JicDdzaFNITXZ6dzFCVDFXc0paVGlEZkZkTHdkYnlDcW5LK09SSEZ0SjJRUmVyRTBmSCtiMzMzUzIvYTlkajMzeEdzbkI1ZDlmdytyaHdjUWhDYWthYzZGOU9vTnBrNlhXWHN3QndUQitlSlRqUW9MTUJ3a09QU1loZDlBem5Dak1NRDNpdGVsVWc5bWlpMWhRam5RRVNRakJCNWo4T1lweGF5aVBnRWRqNnc4NUp2Zi84Zi92Qlk5ZjdmN2QzWUhMcjB0UVBrOG10cE5qelZ1U1pSUFdGdXFzYjQ0WGxPN3BralBscW52eFp3YWFIQVFMR2J6bFVoQ0NSZVNWUkpFdVYvVTZBakNHaldFMUJ3RGpLZEFWNHc1bW1GTEJKMy8rZTlsMzN0WC8vbVBSUEI3dDljdWJVamQvbXFmaHdCY1QxaG9WU25OTmZnc1NQempEODhSKzJSS24wbFlVdEhKOHQ3ZThnUEJ5UUtpU3FSZWtoNGFnNmNWK3FsbUxORUhHRldhSGlQdzVpbkZ0TG05dTA1dU9yelg3LzFmY2ZqZTk2eS91cWUzQlZESXlTeFVwdFBpT29SYzFOMWp1K2Q0Y3l1V1FxblBXdXpCVVo2QnVuc3krQ0JwdmMwRXMrenBhcmt3NUNGdXNjcjRDRFhtYUdFUnhWam5sSkltenI1MkptZXozL3BrOWZ0UEhQSGRhdXV5UFZldVhvMVNjTlRub21vbFdPbVRsYzV2bWVHaFlkTERKZERYdFRWeThDcVBDclE5RXJrUFQ4UEJRU29sMkpVRmVjY21WeUF4NWluRjlKbWZBSmZ1UDF6Yjd4ajUyYy8zTDgxV3JQanFtRzA2YWpNUk5RclRTYkd5eHo1OFNUUjRScXJveHhYOXcvUTFadWxxVXFrSGhKK0lhcVF6d1FrMVFUdmxiTXl1WUJJUENqR1BLV1FOdkxZb3lmNy91SlQ3Ny9sVE9mOWJ4bjl0WlVFTGtOMXJrbWowbVIycXNyUkI2ZXA3YW13TVNtd3JtODVIZm1BeUNzTjcza3VDWTY0MWtTOUlzNFI1Z1FYT0ZRVkhNWThxWkEyOGMvLzlKMWYrZHZ2ZmZnencxZkZsMndkV1VPOTBxUmNyak0vWGVQUkE3UE03RnBnYlRYSDZNQXd1VnhBbkhnYWllZTVwaWpaVUhDUm9nN0NqTkRSazZVdWl2Y0tBY1k4cVpBTFhMMGF5VWR2dmZIUGQ4NSsrNGJOMXc2SEdlbGlZYXBCdFJReGZteUJFL2RQTVRncHZMeHZnTzZMc3NUZUV5V2U4MFlobHd1UjhTYkhkazR6dUs2THNmdW42R3VHdU1BQmlqRlBKdVFDZHVia1ZOZHRYL3pBcmVPRmU5KzZiZHNJallwbnZseGpZYWJPc2IwekpBL1ZlR0dtaCtVakJacXFSSW5uZkZOQU1zSlZycGVaMjA1UnlweG1XUjAyOVBlUm9CanpWRUl1VUtmSEo3dHUrTmc3dnhWZU12YnlrYUZocW5NeDVia0dFK01WeG5iTnNQS1VzS04vaUNBalJONlRKbFZGQXNkUWtBY0ZMWUpYSlEycUlPSThwdTJFWElCT0hCOWY5cEV2L1BIWGNsdkdyK250N2FjMEcxR1piZkRvb1ZsbWQ4Nnp3M2V6WnJoSWpOTDBubFpRSUVIQkFVb3FGQ1ViQmxSSzVXNU0yd201d0l5Zk9OVjd3OGZmL1AyK3k4cFhGdkk5bEtZYmxHY2JITjA3VGJLendqVzlBeFFMV1NMdldXcFVvU01iTWprM080QnBPeUVYa0puSitkejdiLzJqTC9WdUwxOVp5QlVwelVRc1ROYzR1bmVHWUhlZGE0YUhDVEpDN0QxTGxTcVBVNDlwTzhJRjVDOC84YUViNjBPSFhsMHNkbEV0eDVSbTZoelpQVVd3dTg3TGhvY0pRaUh4aWpIdFNMaEFmT1hMWDMzTlEvTjN2R2ZkNWhYVVN6R1Z1WWl4STNOazlqWjQyZkFRRWpvU1ZZeHBWOElGNE1DK3d5T2Yvc2FIUHJseVF5K25EcGNvejBaTW5DeFQyVlBtSlFORFNFWklWREdtblFrWGdCcy84cjZiWC9EVy9sVXYrdTJOWFBxaTVVeWZxakQyNEF5WHUyN3krWkRFSzhhMHU1QVd1KytlK3k2NzV6L3VldDB2WGY5aVZKV1JTM3ZKRkVPV2p6bldyZXNpVW84NHg0WE1PVkloemhHSUF4eW0vWVMwME9UTWJPR3pOOTN3MTgvTDVyc2YrT1pqUFA5TjY1azhVeU42c01LV1pYMlVtazI4S2hlNnhDdUo5NXh2NGh6ejlRaFZ4YlNma0JhNjdhWVAzbnptNEo2cmtaQ0hiOW5OenIvZmgwYWV6b3JuVEM3QWU2VWRlTzlKZk1MNTVvQzVrbWZEMEVaTSt3bHBrZHR2di8yM3Z2THAyNjdyRG9BRWxnWGdKNXJnZ0FCOFBhWmRCRURBK2VlQURPQXc3U2lrQmZZZE9MRHU1dXV2KzNoM0F0a1FOQVRQNHpMOGxNT1l4VVZvZ2ZmOHlicy82cWRuVnVUeW9CaXpOQWdwKy9FRE8wZC9mTmUvdkxhL0FGNHhac2tRVXJacjE2NGR2dUd6RW1ETWtpS2tMRzdHZVl4WmdvU1VGVHVMODV5bEdMT2tDQ203WlBQbUF3UjRWWXhaVW9TVXJWdTdkcXhuY1BCMDFNU1lKVVZJMmZEZ3dOenlOV3VQMW1Od0dMTjBDQzJ3OXVKTkI2b2VITVlzSFVJTGJOMSsyVU0xd0RtTVdUS0VGdGd5T3JvdkFWUXhac2tRV3VEaWpSYy9raWxrcTk1anpKSWh0TUNxa1pHVHZjTXJIb3RpakZreWhCWW9GZ3JSbW8yYkRsVmpjQml6TkFndHN1blMwWWVyZ01PWXBVRm9rYzFidHV5dEE4NWh6SklndE1qbzF0SDlPRkNQTVV1QzBDTHIxNjE3dE5qZk54a25HTE1rQ0MyeWZIajUxTUJGSTQ4MlluQVlzL2dKTFJLSVk5M0dTL1pYRTNBWXMvZ0pMYlJsMi9ZOVZjQTVqRm4waEJiYXNuVjBiNVBIS2NZc2VrSUxiZHE0NmJCa1hlUTl4aXg2UWd1dFdiTm12SGQ0NVhqVXhKaEZUMmloM3U2dTZxb05GeCtwUmVBd1puRVRXbXo5cGt2MlZ3R0hNWXViMEdKYnRtNTdxQVk0aHpHTG10QmlvNk9qK3hWUXhaaEZUV2l4RFJzMkhPdm9MYzQyRTR4WjFJUVd1MmpseXRQTFZsdzBGc1hnTUdieEVsb3Ntd2wxMWJvTkI2dE5qRm5VaEJZN2Z2ejR5b2VQN3ZsbERjQTVqRm0waEJiN3UyOTg0ay83dHpkSElnV25HTE5vQ1MxMDd6MzNiZDgzKzROM2JYM0JhdW9CcUdMTW9pVzBpQ2J3bVMvKzFRY2xIeFVhQ3drVU1uaVBNWXVXMENKZi8rbzNYMW51MmY4YnIzanpOcmI5NmdvNmhqcG9OTUZoek9JVTBpTE5aaEkyR2pHRjNwQU5nLzFjKzdiUitQNC91eS9qc2p3NXBhMnBRdUw1aFRqQTh6Z2x4TFNka0JaNTQrLy96bmNid2V3Nzcvalk1ejQydUxxWTdZNjNmSFZlN245RHBhRVpIRCtqSUprZ2trd1FvVGpha0txNlhENWZ6M2QxTDZpcTQrZWtnRlFxbmRzdnYveEhtTGJqVkpXV1VUaHk4UGpRMlBqWTZpQnc2a0luL0QvcVZZcGR4WVhlWlgzejNudWhEYW1xeStYeWpXS3hXRlpWeHkrb3A5aFpEOE13d2JTVmtGWnljUEhtdFJNWGIxNDdnVEdMbkdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEpoV0NNU1lWZ2pFbUZZSXhKaFdDTVNZVmdqRW1GWUl4SmhXQ01TWVZnakVtRllJeEp4WDhCMmJFbWxhdDBMSjBBQUFBQVNVVk9SSzVDWUlJPVwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcIndpZHRoXCI6IDExMCxcclxuICAgIFwiaGVpZ2h0XCI6IDgzLFxyXG4gICAgXCJ1cmxcIjogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUc0QUFBQlRDQVlBQUFCK3Z6S0lBQUFBQWtsRVFWUjRBZXdhZnRJQUFBV3BTVVJCVk8zQlhXeVZkeDNBOGUvdi96elBlU3R0ZVNtbFRYblpodElCMW1tSW1WRWtDN0JFdDRRTk5TWWFKTEpsTnhvak40STM0aTVNakxjbXhoQTN4WkhvWm94c1VaZTVMTkV0VExJU05sNm1qRExhc0ZMN1FxR243V25QNlhuTy8va0pGNW93MUl5ZXRxYzcrWDArR0dPTU1jWVlZOHdpZFBqdzRXMllENWZUcDArdjNyeXBjN0JRS0RqTWJSeUxWQ2FkTFNYZVoxNTk5YlcxbU5zRUxGSzlNOTFIMXQ0ZmJ1bCsrOFFuM3VudS94WG1GbzVGcW1sbGtONzUrQVk2TmpjMVltNFRza2pGQlRjUmx6MVJpaXp2YzZubmNrUFB4WGZXREk0TXRBK1A5cmVORmdiYkMrWFIxc1RGYVkzS3VXSnhPbGNZalBwZWVPYVZROVNwa0VVcXJVMmpsZGpqazVtVmV3N3VlSHJwUFhMWHlyV05UZGxHdC96WTlmMHRyazBibzd0RmxxWWRyWm1BTUlvUWw4SzVSc0xVU3JxZnY5ck5NeHlpVG9Vc0VpZmZlTFBsVDMvOTdVTTkrYjk5b2FOcnlicUphNU1mVlo5RnFhemMra1RiWTBFVU1EMFpVNXFJS1l5VktlWmpac2JMVkFxZWVESW1tZkFFc2VKTENhSXdPSmlsbm9YVTBKR2pQNy8vOWI1amp5Mi9WejcrMHNUM055M1o3cHEyTnJkU0xpVk1kMDhTenlTRUtjZnJQenpQa2pHSUppSDBRcVJDNklTMEV4QkJCSlIvY3dST0dDL2lxR01oQyt6WjU1N2Q5TXI1bzk5Y3NaSFA5aTM5WGRmR3pabkF4M0MxZjRwTHB5YklueG1uc1Q4aG1VcW8vSFFaVVNaZzFidENOaE9DVTNEOGgzS1RvdHdxVVNFaVNWUEhRaGJJRDM3MHZWMURtWlBmT2hNOXZYWDl6bFN1VW9iaDNtbk8vV0dBMUxrU0s4b3BPdElwN29vYVNESktQaWtUbHlxRTZZQ2lKb0J5WjRSNkZqTFBEano1N2QwVEsvNStjS2FqKzFPcm16UHUrbUNSbm1QREJLZW1hWXZUZkN5VGdpaENJK1VtcndrM0JRS1ZVa0tVQ1NpZ21GdUZ6Sk5mL1BLcCs0NFAvL3JIZnQzWkhhMk5tWEN3YjVKenp3L1FmaEUyWnJLNHFCRU5GVVg1YndKeGxFdWUzTElVWGpIdkV6SVA5dXgvK01DcHl0SHZycm8zYWhtOVV1TDhpNE9zdXhTd0padERHN2hCVVZYK245QUp2dXhKWlFPOEpKaGJCY3lob1lHcnFXTEhoYU5MUGpLKzN6bHA2RGx4bGRTZko5bFl6SkZMaFNCOFlJRnpqSStYS0k3TWtMdWNFQWJDQnlVaWpGV0NrYlB2RGZ5TU9oVXlSeTczWGNrZStzMVhYMmhvangvTUQ1WVpQbjZOeldNNXNya0dGT1dPaWRMU0s5QTdnMGFPTzZFb2dqcnFXTWdjdURhU0R3NGUyZjNISlcxKys5Q2xLV2Ira21lTGE0UUlGR1cyRkdWV0ZBSmZ6bEhIQXViQVB6bHp1UG1lMHBkSHJ4UXB2anhHVjlnTVFzMElRajVtN0V6LzBFK29VNDRxN2RuM3RhOTBmSHBtYjF4VXJwMjRUbGVxR1JYRnpDOUhGVVpHcjBmNXMyY09MbTl2U0M5cno5RjVQVXNGeFN0NEJhL2dGYnlDVi9BS1hzRXJlQVd2NEJXOGdsZndDbDdCSzNnRnIrQVRpTDBTZXlYMlN1eVYyQ3V4VjJLdnhGNkp2Uko3SmZaSzdKVTRTZkJLWFJPcXNPdkJuVStOdjMzeThmSFNOTTRyb1Fnb2MwcFZVZlhjcWFSalErK2JGeTZzcDA2RnpOS1hkbjl4ejhXWFgveDZsaElwNW84QXdwMFJRS2x2amxucXZmVHV2aHlsbEdKcXdURkxxVXdtUWpBMTRwaWwvTWp3V0pKZ2FzUXhTK3M3Tzk4cUo1Z2FjY3pTUTdzZWZhMGltQnB4ek5MMm5UdmVra3hUQVZNVGpsbmExTms1bGx0NzkzdUNxUVZIRmNxcUl5S1lHbkJVSVM1T1hhNTRUQTA0cXZDWkI3YWZLR05xd1ZHRmh4OTU1SGlpSkpnRjU2akN0czl0NndsYjE0d0lacUU1cXJDc3VTbk90SzdxRjhFc01FZVZ4dlA1cTZxWUJlYW9Va3ZMaW4rVVBXYUJPYW9Vcms0K21RaG1nVG1xOE1SMzl1eHR1ODgvVUJHSFdWaU9Lb3huZXZmdCtNYUdvR1hiNnNRQkFnZ2dnQUFDQ0NDQUFBSUlJSUFBQWdnZ2dBQUNDQ0NBQUFJSUlJQUFBZ2czS0dnQ21vQW1vQWxvQXBxQUpxQUpOd2wxTEtRS24rL2FlNkQ3OTg4OXVUVFhPWFJsVFc0ZE4yamlrL0pVb2NTOEVVbUZURGtuTWYrREFzMHRLNGE0Z0RIR0dHT01NY1lZWTR3eHhoaGpqREhHR0dPTU1jWVlZNHd4eGhoampESEdHR09NTWNaOG1Qd0xmZHBReHlDaEdMNEFBQUFBU1VWT1JLNUNZSUk9XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwid2lkdGhcIjogNTUsXHJcbiAgICBcImhlaWdodFwiOiA0MixcclxuICAgIFwidXJsXCI6IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEY0FBQUFxQ0FZQUFBQVhrOE1EQUFBQUFrbEVRVlI0QWV3YWZ0SUFBQUloU1VSQlZPM0JUVWdVVVFEQThmK2JlYlBqZnBDS0N5YXBGSVpFaUVTQjBMbUVwQWdob2FDT0NoRlJ4N29zQm5XSmlJNGhkUWc4UkNVVWhFbnBwU2dJSWRDRXNBNUJZSDR0cSt1dXJPN3M3THlDT2dUSmFDbkxqcnpmRDAzYjV2cjYrdmF3WGJXMjdCOFlISHhSVFprdzJFTHRWM2UyUGg2NzFVdVprR3loZUdNc3Y3cVVhN3J5NlBpZGVJTmRGNG9ZY2F0Q2hvVlFFU0QwY1RqOThPN0ZsemNvRWNrbVBPaS8xekRtUE8ydWJiSU9ZNnE5SzFtblBscFZiSW02ZVpaR3M3aEpCM2ZSeGNzVUVYbkYzSUpkU3dsSi9zT0YyeWZPMXpSN1p6OFhueHlRaS9uWTdOQUszbmlPY0VjMVhzYWw4SG9GQVZpQXhTOENRZGhSSVVwSThnOTZiblowVnpVV0xxMHVwMXRTd3psaFR6akVERWxZOEpQRXlYa1lFWk55SWRtQTJlOUo4L3J6TS8wZTJhN0ZrWXdWL3dxV2FZQXArWk0zNHlCcUpPVkNzbzdVZkZva0JqcUhjcW5sOXFvM3E4U1ZCSk0xVlh3cUFBWFdvbENZbm10UlFpYnJ5Ty83Y0g5NUlkc1ZIOGtURlpMTnlEaHFZbnhxOWhrbEl2RnhzdjNvcWVURTNHbVJjVW1tODJ5RVVncWwrSnVBRkdGS1NlSmplbkl5WWJ5YmlyRkYzUHBtU3NuQWoxS1ZCSmlCRDhPMnB3a3dBeDh1ZkNQQURId1ViZnNMQVdiZzQ4aXhqbGNGaFNLZ0RId2tlcSs5bHpXN0ZnZ29BeC9WbFRzOHIxaWNKNkFNZlBSY1BuY3cxaGFwSTZBa1BuTFJtYlpEbmJ2bjNvN21sankzNENtMzRMRkJRZ2dQb1Z4K0U0QmxoNmJSTkUzVE5FM1RORTNUTkcyYitnRnVrc0VLK2pjNEt3QUFBQUJKUlU1RXJrSmdnZz09XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwid2lkdGhcIjogMjgsXHJcbiAgICBcImhlaWdodFwiOiAyMSxcclxuICAgIFwidXJsXCI6IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCd0FBQUFWQ0FZQUFBQlZBbzVjQUFBQUFrbEVRVlI0QWV3YWZ0SUFBQUVwU1VSQlZPM0JRU3NFVVFBSDhQOTc4OTRPVTd0YVJ1RURPRG00dUVoSUhGeGMrQWJpNEtDY1hRbGZRRTBLNVJOUTRrU3lSMGs1ckNnVXM4MWw5NkNkM1RjenpYdmFJcFBFTmt3NXpPK0hmOG15ckR6K2lJWW1tSU9WdGY2eFhuNTE4bkNMWHlMNHh1N2VWdHRqeDhHOHBzdHAxeGE1bGhBWkVzTHdhL0p1ZGZGMEJERXdmR0Z1WTNMQTZLd3ZYei92RExPTElDOEJzQkFJYndJMEJKS1dFUlBESnd1Ym83UFNLYS9yNTU2cEM0SUdtU1dBVHZCQkVjVEVFREUxTWQ1WGZhcXM1TTdxcGtjSVBMeXBBMG9wdlBNVm9ZaUpJYUpVTEM0NUJic0xQNUJaRTNGUlJHVjBCd21qaURCNnVnc1NVRWdRUmNUKzRkRXhNZkl2U0pDR0NCdVhRNlRkbTNIdlBWOVJKaFRsUWxFdUZPVkNVUzZnOFJvMFhpTjZxMTJxdXR0SXBWS3BacndDZ01Wa3hOTnluQ01BQUFBQVNVVk9SSzVDWUlJPVwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcIndpZHRoXCI6IDE0LFxyXG4gICAgXCJoZWlnaHRcIjogMTEsXHJcbiAgICBcInVybFwiOiBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTRBQUFBTENBWUFBQUJQaGJ4aUFBQUFBa2xFUVZSNEFld2FmdElBQUFDZlNVUkJWR05BQnpObnp1UmtJQUl3TWlDQkJZdG5zOS9pWHRQTStQR1BPUFBQLzcrYU12YWxNdUFBTEF4UWtORm8wWDd0eE13azVpLy94QmkvL21mNDgvNy9hd1lHaGxRR0hJQ0ZBUWhNRmVSRFh4NThVZlRoNVQ4MkJpRDQvLzgvd3o5R0prWUdQSUNGQVFnWU9UbC9QamwyZzVXUkFRSCtzL015NEFOTURFQ2c1aTkva1ZWTjlQTi9acmJ2LzVuWnZ2OW5adnZPd01UNG5XRVVrQWNBZ09neVBxWWZZYmtBQUFBQVNVVk9SSzVDWUlJPVwiXHJcbiAgfVxyXG5dO1xyXG5taXBtYXBzLmZvckVhY2goIG1pcG1hcCA9PiB7XHJcbiAgbWlwbWFwLmltZyA9IG5ldyBJbWFnZSgpO1xyXG4gIGNvbnN0IHVubG9jayA9IGFzeW5jTG9hZGVyLmNyZWF0ZUxvY2soIG1pcG1hcC5pbWcgKTtcclxuICBtaXBtYXAuaW1nLm9ubG9hZCA9IHVubG9jaztcclxuICBtaXBtYXAuaW1nLnNyYyA9IG1pcG1hcC51cmw7IC8vIHRyaWdnZXIgdGhlIGxvYWRpbmcgb2YgdGhlIGltYWdlIGZvciBpdHMgbGV2ZWxcclxuICBtaXBtYXAuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcclxuICBtaXBtYXAuY2FudmFzLndpZHRoID0gbWlwbWFwLndpZHRoO1xyXG4gIG1pcG1hcC5jYW52YXMuaGVpZ2h0ID0gbWlwbWFwLmhlaWdodDtcclxuICBjb25zdCBjb250ZXh0ID0gbWlwbWFwLmNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XHJcbiAgbWlwbWFwLnVwZGF0ZUNhbnZhcyA9ICgpID0+IHtcclxuICAgIGlmICggbWlwbWFwLmltZy5jb21wbGV0ZSAmJiAoIHR5cGVvZiBtaXBtYXAuaW1nLm5hdHVyYWxXaWR0aCA9PT0gJ3VuZGVmaW5lZCcgfHwgbWlwbWFwLmltZy5uYXR1cmFsV2lkdGggPiAwICkgKSB7XHJcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKCBtaXBtYXAuaW1nLCAwLCAwICk7XHJcbiAgICAgIGRlbGV0ZSBtaXBtYXAudXBkYXRlQ2FudmFzO1xyXG4gICAgfVxyXG4gIH07XHJcbn0gKTtcclxuZXhwb3J0IGRlZmF1bHQgbWlwbWFwczsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsT0FBT0EsV0FBVyxNQUFNLG1DQUFtQztBQUUzRCxNQUFNQyxPQUFPLEdBQUcsQ0FDZDtFQUNFLE9BQU8sRUFBRSxHQUFHO0VBQ1osUUFBUSxFQUFFLEdBQUc7RUFDYixLQUFLLEVBQUU7QUFDVCxDQUFDLEVBQ0Q7RUFDRSxPQUFPLEVBQUUsR0FBRztFQUNaLFFBQVEsRUFBRSxFQUFFO0VBQ1osS0FBSyxFQUFFO0FBQ1QsQ0FBQyxFQUNEO0VBQ0UsT0FBTyxFQUFFLEVBQUU7RUFDWCxRQUFRLEVBQUUsRUFBRTtFQUNaLEtBQUssRUFBRTtBQUNULENBQUMsRUFDRDtFQUNFLE9BQU8sRUFBRSxFQUFFO0VBQ1gsUUFBUSxFQUFFLEVBQUU7RUFDWixLQUFLLEVBQUU7QUFDVCxDQUFDLEVBQ0Q7RUFDRSxPQUFPLEVBQUUsRUFBRTtFQUNYLFFBQVEsRUFBRSxFQUFFO0VBQ1osS0FBSyxFQUFFO0FBQ1QsQ0FBQyxDQUNGO0FBQ0RBLE9BQU8sQ0FBQ0MsT0FBTyxDQUFFQyxNQUFNLElBQUk7RUFDekJBLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHLElBQUlDLEtBQUssQ0FBQyxDQUFDO0VBQ3hCLE1BQU1DLE1BQU0sR0FBR04sV0FBVyxDQUFDTyxVQUFVLENBQUVKLE1BQU0sQ0FBQ0MsR0FBSSxDQUFDO0VBQ25ERCxNQUFNLENBQUNDLEdBQUcsQ0FBQ0ksTUFBTSxHQUFHRixNQUFNO0VBQzFCSCxNQUFNLENBQUNDLEdBQUcsQ0FBQ0ssR0FBRyxHQUFHTixNQUFNLENBQUNPLEdBQUcsQ0FBQyxDQUFDO0VBQzdCUCxNQUFNLENBQUNRLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUUsUUFBUyxDQUFDO0VBQ2xEVixNQUFNLENBQUNRLE1BQU0sQ0FBQ0csS0FBSyxHQUFHWCxNQUFNLENBQUNXLEtBQUs7RUFDbENYLE1BQU0sQ0FBQ1EsTUFBTSxDQUFDSSxNQUFNLEdBQUdaLE1BQU0sQ0FBQ1ksTUFBTTtFQUNwQyxNQUFNQyxPQUFPLEdBQUdiLE1BQU0sQ0FBQ1EsTUFBTSxDQUFDTSxVQUFVLENBQUUsSUFBSyxDQUFDO0VBQ2hEZCxNQUFNLENBQUNlLFlBQVksR0FBRyxNQUFNO0lBQzFCLElBQUtmLE1BQU0sQ0FBQ0MsR0FBRyxDQUFDZSxRQUFRLEtBQU0sT0FBT2hCLE1BQU0sQ0FBQ0MsR0FBRyxDQUFDZ0IsWUFBWSxLQUFLLFdBQVcsSUFBSWpCLE1BQU0sQ0FBQ0MsR0FBRyxDQUFDZ0IsWUFBWSxHQUFHLENBQUMsQ0FBRSxFQUFHO01BQzlHSixPQUFPLENBQUNLLFNBQVMsQ0FBRWxCLE1BQU0sQ0FBQ0MsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUM7TUFDckMsT0FBT0QsTUFBTSxDQUFDZSxZQUFZO0lBQzVCO0VBQ0YsQ0FBQztBQUNILENBQUUsQ0FBQztBQUNILGVBQWVqQixPQUFPIn0=