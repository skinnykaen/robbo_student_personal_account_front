import instance from './instance'

export const robboGroupAPI = {
    getRobboGroupById(token, robboUnitId, robboGroupId) {
        return instance.get(`robboUnits/${robboUnitId}/robboGroup/${robboGroupId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
    },

    getRobboGroupsByRobboUnitId(token, robboUnitId) {
        return instance.get(`robboUnits/${robboUnitId}/robboGroup/`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
    },

    deleteRobboGroup(token, robboUnitId, robboGroupId) {
        return instance.delete(`robboUnits/${robboUnitId}/robboGroup/${robboGroupId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
    },

    createRobboGroup(token, robboUnitId, robboGroup) {
        const { name } = robboGroup
        return instance.post(`robboUnits/${robboUnitId}/robboGroup`,
            {
                name,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
    },
}