"""Launch B2 Web RViz gateway (FastAPI + Nav2 waypoints + point cloud stream).

Defaults match a FAST-LIO Nav2 setup:
  fixed_frame      = odom_sync
  base_frame       = base_footprint_sync
  pointcloud_topic = /cloud_registered            (world-fixed, TF will be applied)
  pointcloud_in_robot_frame = false               (set true if you stream /cloud_registered_body)

Override per-run, e.g.:
  ros2 launch b2_web_rviz b2_web_gateway.launch.py \\
    pointcloud_topic:=/cloud_registered_body pointcloud_in_robot_frame:=true
"""

from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    return LaunchDescription([
        DeclareLaunchArgument(
            'pointcloud_topic', default_value='/cloud_registered',
            description='PointCloud2 topic to stream to browsers'),
        DeclareLaunchArgument(
            'fixed_frame', default_value='odom_sync',
            description='TF fixed frame (same as Nav2 global_frame when using odom mode)'),
        DeclareLaunchArgument(
            'base_frame', default_value='base_footprint_sync',
            description='TF robot base frame'),
        DeclareLaunchArgument(
            'pointcloud_in_robot_frame', default_value='false',
            description='If true, do not apply TF to cloud and parent it under the robot in the UI '
                        '(use with /cloud_registered_body)'),
        DeclareLaunchArgument(
            'web_port', default_value='8080',
            description='HTTP / WebSocket port'),
        DeclareLaunchArgument(
            'follow_waypoints_action', default_value='/follow_waypoints',
            description='Nav2 FollowWaypoints action name'),
        DeclareLaunchArgument(
            'plan_topic', default_value='/plan',
            description='nav_msgs/Path topic from Nav2 planner; UI draws it as a polyline'),
        DeclareLaunchArgument(
            'robot_description_node', default_value='robot_state_publisher',
            description='Node name to pull robot_description parameter from'),
        DeclareLaunchArgument(
            'joint_states_topic', default_value='/joint_states',
            description='sensor_msgs/JointState for animated URDF in the web UI'),
        DeclareLaunchArgument(
            'subscribe_joint_states', default_value='true',
            description='If false, skip JointState subscription'),
        DeclareLaunchArgument(
            'cache_urdf_assets', default_value='true',
            description='Mirror package:// meshes into asset_cache_dir when URDF updates'),
        DeclareLaunchArgument(
            'asset_cache_dir', default_value='',
            description='Cache directory (empty = ~/.cache/b2_web_rviz/package_assets)'),
        DeclareLaunchArgument(
            'use_bundled_b2_urdf', default_value='true',
            description='If true, load B2 URDF+meshes from b2_web_rviz share (ignore /robot_description)'),
        DeclareLaunchArgument(
            'process_manifest_file', default_value='',
            description='Optional JSON file overriding the launcher manifest (default = built-in)'),

        Node(
            package='b2_web_rviz',
            executable='b2_web_gateway',
            name='b2_web_gateway',
            output='screen',
            parameters=[{
                'pointcloud_topic': LaunchConfiguration('pointcloud_topic'),
                'fixed_frame': LaunchConfiguration('fixed_frame'),
                'base_frame': LaunchConfiguration('base_frame'),
                'pointcloud_in_robot_frame': LaunchConfiguration('pointcloud_in_robot_frame'),
                'web_port': LaunchConfiguration('web_port'),
                'follow_waypoints_action': LaunchConfiguration('follow_waypoints_action'),
                'plan_topic': LaunchConfiguration('plan_topic'),
                'robot_description_node': LaunchConfiguration('robot_description_node'),
                'joint_states_topic': LaunchConfiguration('joint_states_topic'),
                'subscribe_joint_states': LaunchConfiguration('subscribe_joint_states'),
                'cache_urdf_assets': LaunchConfiguration('cache_urdf_assets'),
                'asset_cache_dir': LaunchConfiguration('asset_cache_dir'),
                'use_bundled_b2_urdf': LaunchConfiguration('use_bundled_b2_urdf'),
                'process_manifest_file': LaunchConfiguration('process_manifest_file'),
            }],
        ),
    ])
