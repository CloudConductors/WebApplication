import numpy as np
from scipy.stats import norm

class StatsModel:
    def __init__(self, components, confidence_level=.95, compression_range=30):
        self.components = components
        self.repair_threashold = 1 - confidence_level
        self.compression_range = compression_range

    def construct_schedual(self):
        maintenance_day = []
        for i, component in enumerate(self.components):
            maintenance_day.append(component.last_repair + int(norm.ppf(self.repair_threashold, loc=component.mean_failure, scale=np.sqrt(component.var_failure))))
        for i, date in enumerate(maintenance_day):
            for j in range(i, len(maintenance_day)):
                days_between = maintenance_day[j] - date
                if 0 < days_between < self.compression_range:
                    print("i: ", i, " j:", j)
                    print("date: ", date, " date2: ", maintenance_day[j])
                    print("hit")
                    print(days_between)
                    maintenance_day[j] = date
        return maintenance_day

class Component:
    def __init__(self, last_rep, mean_fail, var):
        self.last_repair = last_rep
        self.mean_fail = mean_fail
        self.var = var

    @staticmethod
    def gen_components(component_dict):
        comps = []
        for comp in component_dict:
            c = Component(comp["last_rep"], comp["mean_fail"], comp["var"])
            comps.append(c)
        return comps



if __name__ == "__main__":
    pass
    #model = StatsModel()
    #schedual = model.construct_schedual()
    #print(schedual)
