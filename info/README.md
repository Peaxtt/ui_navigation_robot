How to run 

1) Play ROS2 Bag
ros2 bag play rosbag2_2026_05_09-20_55_21


2) Run Web
ros2 run b2_web_rviz b2_web_gateway --ros-args   -p fixed_frame:=odom_sync   -p base_frame:=base_footprint_sync   -p pointcloud_topic:=/cloud_registered_body   -p pointcloud_in_robot_frame:=true
Enter to http://0.0.0.0:8080/app/





Ref from this Rviz2: 
fastlio_nav2_odom.rviz























