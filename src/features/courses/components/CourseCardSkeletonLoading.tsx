import { View } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
const CourseCardSkeletonLoading = () => {
    return (

        <Skeleton
            isLoading={true}
            containerStyle={{

                flexDirection: 'row',
                gap: 10,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 12,
                marginVertical: 6,
                marginHorizontal: 16,
                shadowColor: '#0F172A',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
            }}
            layout={[
                // Image
                { width: 100, height: 100 },
                // Text rows
                {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 6,
                    children: [
                        { width: 150, height: 16 },
                        { width: 100, height: 12 },
                        { width: 80, height: 12 },
                        { width: 150, height: 12 },
                    ],
                },
            ]}
        />

    );
};

export default CourseCardSkeletonLoading;