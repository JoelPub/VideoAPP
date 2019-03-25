package io.github.joelpub.core.models.amp;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AMPImageModel {


    @Inject
    private String description;

    @Inject
    private List<String> featureGroups;

    @PostConstruct
    private void init(){

    }

    public String getDescription() {
        return description;
    }

    public List<String> getFeatureGroups() {
        return featureGroups;
    }
}
