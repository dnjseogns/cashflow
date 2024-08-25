export const SV_SAVE = "@@SURVEY/SAVE";
export const SV_CLEAN = "@@SURVEY/CLEAN";

export const SvSave = (data) => ({
    type : SV_SAVE,
    payload : data
});

export const SvClean = () => ({
   type : SV_CLEAN
});