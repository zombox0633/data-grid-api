//docker

volumes:
  db_data:
    name: db_data
    driver: local
    driver_opts: 
      o: bind
      type: none
      device: ./db_data

เป็นการระบุบให้สำรองตัว db ไว้ในเครื่องในไฟล์ docker

./dockerUp.bat
./dockerDown.bat
