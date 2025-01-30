import {api as index} from ".."
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getAboutUs: build.query<ABOUTUS.GetAboutusReaponse, OPENING.GetOpeningRequest>({
            query: () => ({
                url: `/about_us/`,
                method: "GET",
                noAuth: true
            }),
            providesTags: ["aboutUs"],
        })
    })
})

export const {useGetAboutUsQuery} = api