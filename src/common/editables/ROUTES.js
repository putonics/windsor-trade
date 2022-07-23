// import { lazy } from "react"
// import Loadable from "./Loadable"
// Loadable(lazy(() => route.element))

import Dash from "../../components/dashboard/Dash"
import Login from "../../components/Login"
import Signup from "../../components/Signup"
import PageNotFound from "./PageNotFound"
import Members from "../../components/members/Members"
import Profile from "../../components/profile/Profile"
import AddPackage from "../../components/package/AddPackage"
import PrivacyPolicies from "../../components/privacy-policies/PrivacyPolicies"
import TermsAndConditions from "../../components/privacy-policies/TermsAndConditions"
import WithdrawalForm from "../../components/withdrawal/WithdrawalForm"
export default [
    {
        path: "/",
        element: <Login />,
        auth: false
    },
    {
        path: "/signup/:refdocid",
        element: <Signup />,
        auth: false
    },
    {
        path: "/dash",
        element: <Dash />,
        title: 'Dashboard',
        icon: 'chart-line',
        auth: true
    },
    {
        path: "/package/:amount",
        element: <AddPackage />,
        auth: true
    },
    {
        path: "/profile",
        element: <Profile />,
        title: 'Profile',
        icon: 'user',
        auth: true
    },
    {
        path: "/members/:docid",
        element: <Members />,
        title: 'Members',
        icon: 'people-line',
        auth: true
    },
    {
        path: "/terms",
        element: <TermsAndConditions />,
        title: 'Terms & Conditions',
        icon: 'screwdriver-wrench',
        auth: true
    },
    {
        path: "/withdrawal",
        element: <WithdrawalForm />,
        auth: true
    },
    {
        path: "/privacy-policies",
        element: <PrivacyPolicies />,
    },
    {
        path: '/*',
        element: <PageNotFound />,
        auth: false
    }
]