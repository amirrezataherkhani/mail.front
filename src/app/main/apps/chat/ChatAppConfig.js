import React from 'react';

export const ChatAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/chat/',
            component: React.lazy(() => import('./ChatApp'))
        },
        {
            path : '/friendrequest/user/:slug/send/',
            component: React.lazy(()=>import('./FriendRequest'))
        },
        {
            path : '/requests/',
            component: React.lazy(()=>import('./ShowRequests'))
        }
    ]
};
