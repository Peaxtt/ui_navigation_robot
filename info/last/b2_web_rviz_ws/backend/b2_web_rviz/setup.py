import os
from glob import glob

from setuptools import find_packages, setup

package_name = 'b2_web_rviz'


_DATA_FILE_EXCLUDE_NAMES = {'.DS_Store', 'Thumbs.db'}
_DATA_FILE_EXCLUDE_SUFFIXES = ('.pyc', '.pyo', '.swp', '~')
_DATA_FILE_EXCLUDE_DIRS = {'__pycache__', '.git', '.idea', '.vscode'}


def _walk_for_data_files(src_root, share_subdir):
    """Walk a directory tree producing setuptools-compatible data_files entries while filtering noise."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    if not os.path.isdir(src_root):
        return []
    buckets = {}
    for root, dirs, files in os.walk(src_root):
        dirs[:] = [d for d in dirs if d not in _DATA_FILE_EXCLUDE_DIRS]
        for f in files:
            if f in _DATA_FILE_EXCLUDE_NAMES:
                continue
            if f.endswith(_DATA_FILE_EXCLUDE_SUFFIXES):
                continue
            abs_src = os.path.join(root, f)
            rel_src = os.path.relpath(abs_src, base_dir)
            rel = os.path.relpath(abs_src, src_root)
            rel_dir = os.path.dirname(rel)
            if rel_dir in ('.', ''):
                dst = os.path.join('share', package_name, share_subdir)
            else:
                dst = os.path.join('share', package_name, share_subdir, rel_dir)
            buckets.setdefault(dst, []).append(rel_src)
    return list(buckets.items())


def collect_www_data_files():
    """Install pre-built Vite output from backend/b2_web_rviz/www → share/b2_web_rviz/www."""
    www_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'www')
    return _walk_for_data_files(www_dir, 'www')


def collect_bundled_unitree_b2_files():
    """Ship Unitree B2 URDF + meshes inside b2_web_rviz (no runtime dependency on ros2_b2_unitree_description)."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    bundled_root = os.path.join(base_dir, 'bundled_ros2_b2_unitree_description')
    return _walk_for_data_files(bundled_root, 'bundled_ros2_b2_unitree_description')


setup(
    name=package_name,
    version='0.2.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        (os.path.join('share', package_name), ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*.launch.py'))),
    ] + collect_www_data_files() + collect_bundled_unitree_b2_files(),
    install_requires=[
        'setuptools',
        'fastapi>=0.100',
        'uvicorn>=0.22',
        'numpy',
    ],
    zip_safe=True,
    maintainer='B2 Developer',
    maintainer_email='you@example.com',
    description='Web RViz gateway for ROS2/Nav2/PointCloud2/Waypoints',
    license='MIT',
    entry_points={
        'console_scripts': [
            'b2_web_gateway = b2_web_rviz.b2_web_gateway_node:main',
        ],
    },
)
