API_URL='http://Instagramclone-env-1.eba-9rmbrem3.ap-northeast-2.elasticbeanstalk.com/api'

s3:
	REACT_APP_API_URL=$(API_URL) yarn build
	aws s3 cp `pwd`/build/ s3://zoooo-hs-ic-static/ --recursive