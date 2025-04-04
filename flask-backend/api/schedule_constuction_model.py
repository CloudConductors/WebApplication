import numpy as np
from scipy.stats import norm
from datetime import datetime, timedelta

class StatsModel:
    def __init__(self, components, confidence_level=.95, compression_range=30):
        self.components = components
        self.repair_threashold = 1 - confidence_level
        self.compression_range = compression_range

    def construct_schedual(self):
        schedule = []
        for i, component in enumerate(self.components):
            date = datetime.strptime(component.last_repair, "%m/%d/%Y")
            dt = timedelta(int(norm.ppf(self.repair_threashold, loc=component.mean_fail, scale=component.std_dev)))
            component.recomended_rep = (date + dt).strftime("%m/%d/%Y")
            schedule.append(component)
        for i, comp in enumerate(schedule):
            for j in range(len(schedule)):
                days_between = self._get_days_between(comp.recomended_rep, schedule[j].recomended_rep)
                if 0 < days_between < self.compression_range:
                    print("id1: ", comp.id, " id2:", schedule[j].id)
                    print("date: ", comp.recomended_rep, " date2: ", schedule[j].recomended_rep)
                    print("hit")
                    print(days_between)
                    schedule[j].recomended_rep = comp.recomended_rep
        return schedule

    def _get_days_between(self, str_date1, str_date2):
        date1 = datetime.strptime(str_date1, "%m/%d/%Y")
        date2 = datetime.strptime(str_date2, "%m/%d/%Y")
        return (date2 - date1).days

class Component:
    def __init__(self, id, last_rep, mean_fail, std_dev):
        self.id = id
        self.last_repair = last_rep
        self.mean_fail = mean_fail
        self.std_dev = std_dev 
        self.recomended_rep = None

    @staticmethod
    def gen_components(component_dict):
        comps = []
        for comp in component_dict:
            c = Component(comp["component_id"], comp["last_repair_date"], int(comp["mean_duf"]), int(comp["standard_deviation_duf"]))
            comps.append(c)
        return comps



if __name__ == "__main__":
    pass
    #model = StatsModel()
    #schedual = model.construct_schedual()
    #print(schedual)
