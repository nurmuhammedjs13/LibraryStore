import {api as index} from ".."
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getAboutUs: build.query<ABOUTUS.GetAboutusReaponse, OPENING.GetOpeningRequest>({
            query: () => ({
                url: `/about_us/`,
                method: "GET",
            }),
            providesTags: ["aboutUs"],
        })
    })
})

export const {useGetAboutUsQuery} = api